package com.vincit.beertempreader.controller

import com.vincit.beertempreader.model.Reading
import com.vincit.beertempreader.service.TemperatureService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
class ReadingController(@Autowired val temperatureService: TemperatureService) {

    @GetMapping("/health")
    fun health() = "Yay! I'm alive!"

    @GetMapping("/states")
    fun getStates() = temperatureService.getStates()

    @PostMapping("/newreadings")
    fun saveReadings(@RequestBody readings: List<Reading>) = temperatureService.saveReadings(readings)
}
