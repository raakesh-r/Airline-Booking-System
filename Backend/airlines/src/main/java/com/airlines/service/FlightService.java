package com.airlines.service;

import java.util.List;

import com.airlines.entity.Flight;

public interface FlightService {
    public Flight insertFlight(Flight flight);

    public List<Flight> getAllFlights();

    public Flight getFlightById(Long flightId);

    public void deleteFlightById(Long flightId);

    public Flight updateFlightById(Flight flight, Long flightId);
}
