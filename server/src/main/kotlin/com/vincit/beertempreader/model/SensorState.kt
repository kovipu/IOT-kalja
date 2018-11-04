package com.vincit.beertempreader.model

import com.fasterxml.jackson.annotation.JsonIgnore
import java.time.LocalDateTime

data class SensorState(
        val id: String,
        val timestamp: LocalDateTime = LocalDateTime.now(),
        @JsonIgnore
        val readings: ArrayList<Reading> = arrayListOf(),
        val currentTemp: Double,
        val estimatedFinishTime: LocalDateTime,
        val timeElapsed: Long,
        val timeLeft: Long? = null,
        var targetTemp: Double,
        val ambient: Double
)