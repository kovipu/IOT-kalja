package com.vincit.beertempreader.model

import com.fasterxml.jackson.annotation.JsonIgnore
import java.time.LocalDateTime

data class SensorState(
        val sensorId: String,
        val timestamp: LocalDateTime = LocalDateTime.now(),
        @JsonIgnore
        val readings: ArrayList<Reading> = arrayListOf(),
        val currentTemperature: Double,
        val estimatedFinishTime: LocalDateTime
)