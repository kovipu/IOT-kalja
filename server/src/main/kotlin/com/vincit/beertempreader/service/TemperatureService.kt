package com.vincit.beertempreader.service

import com.vincit.beertempreader.model.Reading
import com.vincit.beertempreader.model.SensorState
import com.vincit.beertempreader.model.TemperatureTarget
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import com.vincit.util.Test

@Service
class TemperatureService {
    val test = Test()
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
                        estimatedFinishTime = countEstimatedFinishTime(state)
                )
                return@fe
            }
            sensorMap[reading.id] = SensorState(
                    id = reading.id,
                    timestamp = LocalDateTime.now(),
                    readings = arrayListOf(reading),
                    currentTemp = reading.`object`,
                    estimatedFinishTime = LocalDateTime.now().plusYears(1)
            )
        }

        return true
    }

    fun getStates() = sensorMap.asSequence()
            .filter { it.value != null }
            .map{ it.value }
            .toList()

    fun saveTargets(targets: List<TemperatureTarget>): Boolean {
        targets.forEach {
            targetMap[it.id] = it.targetTemperature
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

}