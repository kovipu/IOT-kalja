package com.vincit.beertempreader.util;

import com.vincit.beertempreader.model.Reading;
import com.vincit.beertempreader.model.SensorState;

import java.time.LocalDateTime;
import java.util.ArrayList;

class Test {
    public SensorState test() {
        return new SensorState("1", LocalDateTime.now(), new ArrayList<Reading>(), 23.00, LocalDateTime.now());
    }
}