package com.vincit.beertempreader.service

import com.vincit.beertempreader.model.Reading
import com.vincit.beertempreader.model.SensorState
import com.vincit.beertempreader.model.TemperatureTarget
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.time.ZoneOffset

@Service
class TemperatureService {
    val log = LoggerFactory.getLogger(TemperatureService::class.java)

    val sensorMap = HashMap<String, SensorState?>()
    val targetMap = HashMap<String, Double?>()

    fun saveReadings(readings: List<Reading>): Boolean {
        log.info("Received readings: $readings")
        readings.forEach fe@{reading ->
            val state = sensorMap[reading.id]
            state?.let {
                // Reset if temperature rises too much.
                if (reading.`object` >= state.readings.last().`object` + 5) {
                    sensorMap[reading.id] = null
                }
                state.readings.add(reading)
                sensorMap[reading.id] = SensorState(
                        id = reading.id,
                        timestamp = LocalDateTime.now(),
                        readings = state.readings,
                        currentTemp = reading.`object`,
                        timeLeft = timeLeft(state, state.targetTemp).toLong(),
                        estimatedFinishTime = estimatedFinishTime(state, targetMap[reading.id] ?: 5.0),
                        timeElapsed = state.readings.first().timestamp.let { distanceFromNow(it!!) },
                        targetTemp = targetMap[reading.id] ?: 5.0
                )
                return@fe
            }
            sensorMap[reading.id] = SensorState(
                    id = reading.id,
                    timestamp = LocalDateTime.now(),
                    readings = arrayListOf(reading),
                    currentTemp = reading.`object`,
                    timeLeft = 666L,
                    estimatedFinishTime = LocalDateTime.now().plusYears(1),
                    targetTemp = targetMap[reading.id] ?: 5.0,
                    timeElapsed = 0L
            )
        }
        return true
    }

    fun getStates() = sensorMap.asSequence()
            .filter { it.value != null }
            .map{ it.value }
            .toList()

    fun saveTargets(targets: List<TemperatureTarget>): Boolean {
        log.info("Received targets: $targets")
        targets.forEach { temp ->
            targetMap[temp.id] = temp.targetTemperature
            sensorMap[temp.id]?.let {
                it.targetTemp = temp.targetTemperature
            }
        }
        return true
    }

    fun getTargets() = targetMap

    fun reset(id: String): List<SensorState?> {
        sensorMap[id] = null
        return getStates().filter { it != null }
    }

    private fun timeLeft(state: SensorState, target: Double): Double {
        var min: Double? = null
        val filteredTemps = state.readings.map {
            if (min == null) {
                min = it.`object`
                it
            } else if (min!! > it.`object`) {
                min = it.`object`
                it
            } else {
                null
            }
        }.filter { it != null }

        val utcReadings = filteredTemps.filter { it != null }
                .map { it!!.timestamp!!.toEpochSecond(ZoneOffset.UTC) to it.`object` }

        val timeStampChanges= ArrayList<Long>()
        val temperatureChanges = ArrayList<Double>()
        utcReadings.mapIndexed m@{ i, it ->
            if (i==0) return@m
            timeStampChanges.add(it.first - utcReadings[i-1].first)
            temperatureChanges.add(utcReadings[i-1].second - it.second)
        }

        val tsc = timeStampChanges.average()
        val tc = temperatureChanges.average()

        return (state.readings.last().`object` - target) / tc * tsc / 60
    }

    fun estimatedFinishTime(state: SensorState, target: Double): LocalDateTime {
        val timeLeft = timeLeft(state, target)
        log.info("TIME LEFT: $timeLeft")
        return LocalDateTime.now().plusMinutes(timeLeft.toLong())
    }

    /*
        Zone has no value here.
     */
    private fun distanceFromNow(first: LocalDateTime) = (LocalDateTime.now().toEpochSecond(ZoneOffset.UTC) - first.toEpochSecond(ZoneOffset.UTC)) / 60

}