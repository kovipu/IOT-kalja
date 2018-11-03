package com.vincit.beertempreader.service

import com.vincit.beertempreader.model.Reading
import com.vincit.beertempreader.model.SensorState
import com.vincit.beertempreader.model.TemperatureTarget
import com.vincit.util.Test
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.time.ZoneOffset

@Service
class TemperatureService {
    val sensorMap = HashMap<String, SensorState?>()
    val targetMap = HashMap<String, Double?>()

    fun saveReadings(readings: List<Reading>): Boolean {
        readings.forEach fe@{reading ->
            val state = sensorMap[reading.id]
            state?.let {
                // Skip saving if temperature hasn't changed.
                if (reading.`object` >= state.readings.last().`object`) return true

                state.readings.add(reading)
                sensorMap[reading.id] = SensorState(
                        id = reading.id,
                        timestamp = LocalDateTime.now(),
                        readings = state.readings,
                        currentTemp = reading.`object`,
                        estimatedFinishTime = countEstimatedFinishTime(state),
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
                    estimatedFinishTime = LocalDateTime.now().plusYears(1),
                    timeElapsed = 0L,
                    targetTemp = targetMap[reading.id] ?: 5.0
            )
        }
        return true
    }

    fun getStates() = sensorMap.asSequence()
            .filter { it.value != null }
            .map{ it.value }
            .toList()

    fun saveTargets(targets: List<TemperatureTarget>): Boolean {
        val test = Test().test()
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

    private fun countEstimatedFinishTime(state: SensorState): LocalDateTime {
        // TODO: Implement this :DD
        return LocalDateTime.now().plusSeconds(666)
    }

    /*
        Zone has no value here.
     */
    private fun distanceFromNow(first: LocalDateTime) = (LocalDateTime.now().toEpochSecond(ZoneOffset.UTC) - first.toEpochSecond(ZoneOffset.UTC)) / 60000

}