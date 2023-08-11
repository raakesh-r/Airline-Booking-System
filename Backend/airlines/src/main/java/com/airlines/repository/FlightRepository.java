package com.airlines.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.airlines.entity.Flight;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
}
