package com.vincit.beertempreader.model

import java.time.LocalDateTime

data class Reading(
        val sensorId: String,
        val timestamp: LocalDateTime? = LocalDateTime.now(),
        val temperature: Double
)