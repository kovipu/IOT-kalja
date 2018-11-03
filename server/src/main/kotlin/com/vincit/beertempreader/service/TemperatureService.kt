package com.vincit.beertempreader.service

import com.vincit.beertempreader.model.Reading
import com.vincit.beertempreader.model.SensorState
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class TemperatureService {

    val sensorMap = HashMap<String, SensorState>()

    fun saveReading(reading: Reading): Boolean {
        val state = sensorMap[reading.sensorId]
        state?.let {

            // Skip saving if temperature hasn't changed.
            if (reading.temperature >= state.readings.last().temperature) return true

            state.readings.add(reading)
            sensorMap[reading.sensorId] = SensorState(
                    sensorId = reading.sensorId,
                    timestamp = LocalDateTime.now(),
                    readings = state.readings,
                    currentTemperature = reading.temperature,
                    estimatedFinishTime = countEstimatedFinishTime(state)
            )
            return true
        }

        sensorMap[reading.sensorId] = SensorState(
                sensorId = reading.sensorId,
                timestamp = LocalDateTime.now(),
                currentTemperature = reading.temperature,
                estimatedFinishTime = LocalDateTime.now().plusYears(1)
        )
        return true
    }

    fun getStates() = sensorMap

    private fun countEstimatedFinishTime(state: SensorState): LocalDateTime {
        // TODO: Implement this :DD
        return LocalDateTime.now().plusSeconds(666)
    }

}