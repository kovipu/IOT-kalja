package com.vincit.beertempreader

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class BeerTempReaderApplication

fun main(args: Array<String>) {
    runApplication<BeerTempReaderApplication>(*args)
}
