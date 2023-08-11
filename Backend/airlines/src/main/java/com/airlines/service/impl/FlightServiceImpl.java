package com.airlines.service.impl;

import com.airlines.repository.BookingRepository;
import com.airlines.repository.FlightRepository;
import com.airlines.repository.SeatDetailsRepository;
import com.airlines.service.FlightService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.airlines.entity.Flight;

import java.util.List;
import java.util.Objects;

@Service
public class FlightServiceImpl implements FlightService {

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private SeatDetailsRepository seatDetailsRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public Flight insertFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    @Override
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    @Override
    public Flight getFlightById(Long flightId) {
        return flightRepository.findById(flightId).get();
    }

    @Transactional
    @Override
    public void deleteFlightById(Long flightId) {
        bookingRepository.deleteAllBookingsByFlightId(flightId);
        seatDetailsRepository.deleteAllSeatsByFlightId(flightId);
        flightRepository.deleteById(flightId);
    }

    @Override
    public Flight updateFlightById(Flight flight, Long flightId) {
        Flight flightDB = flightRepository.findById(flightId).get();
        if (Objects.nonNull(flight.getFlightName()) && !"".equalsIgnoreCase(flight.getFlightName()))
            flightDB.setFlightName(flight.getFlightName());
        if (Objects.nonNull(flight.getTakeOffTime()) && !"".equalsIgnoreCase(flight.getTakeOffTime()))
            flightDB.setTakeOffTime(flight.getTakeOffTime());
        return flightRepository.save(flightDB);
    }

}
