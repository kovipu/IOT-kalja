package com.vincit.beertempreader.model

import com.fasterxml.jackson.annotation.JsonIgnore
import java.time.LocalDateTime

data class Reading(
        val id: String,
        @JsonIgnore
        val timestamp: LocalDateTime? = LocalDateTime.now(),
        val ambient: Double,
        val `object`: Double
)