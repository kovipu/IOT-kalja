package com.vincit.beertempreader.service

import com.vincit.beertempreader.model.Reading
import com.vincit.beertempreader.model.SensorState
import com.vincit.beertempreader.model.TemperatureTarget
import org.springframework.stereotype.Service
import java.time.LocalDateTime

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

    /**
     * This does not account for leap years,
     * but if your beer sits in the fridge over a year,
     * you have more serious issues than invalid data.
     */
    private fun distanceFromNow(first: LocalDateTime): Long {
        val now = LocalDateTime.now()
        val years = (now.year - first.year) * (60 * 24 * 365)
        val days = (now.dayOfYear - first.dayOfYear) * (60 * 24)
        val hours = (now.hour - first.hour) * 60
        val minutes = now.minute - first.minute

        return (years + days + hours + minutes).toLong()
    }

}