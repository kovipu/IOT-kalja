package com.vincit.beertempreader.service

import com.vincit.beertempreader.model.Reading
import com.vincit.beertempreader.model.SensorState
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class TemperatureService {

    val sensorMap = HashMap<String, SensorState>()

    fun saveReadings(readings: List<Reading>): Boolean {
        readings.forEach fe@{reading ->
            val state = sensorMap[reading.id]
            state?.let {

                // Skip saving if temperature hasn't changed.
                if (reading.`object` >= state.readings.last().`object`) return true

                state.readings.add(reading)
                sensorMap[reading.id] = SensorState(
                        sensorId = reading.id,
                        timestamp = LocalDateTime.now(),
                        readings = state.readings,
                        currentTemperature = reading.`object`,
                        estimatedFinishTime = countEstimatedFinishTime(state)
                )
                return@fe
            }
            sensorMap[reading.id] = SensorState(
                    sensorId = reading.id,
                    timestamp = LocalDateTime.now(),
                    readings = arrayListOf(reading),
                    currentTemperature = reading.`object`,
                    estimatedFinishTime = LocalDateTime.now().plusYears(1)
            )
        }

        return true
    }

    fun getStates() = sensorMap

    private fun countEstimatedFinishTime(state: SensorState): LocalDateTime {
        // TODO: Implement this :DD
        return LocalDateTime.now().plusSeconds(666)
    }

}