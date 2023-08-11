package com.airlines.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.airlines.entity.SeatDetails;

import java.util.List;

@Repository
public interface SeatDetailsRepository extends JpaRepository<SeatDetails, Long> {

    public SeatDetails getAvailableSeatsByFlightIdAndSeatType(Long flightId, String seatType);

    public List<SeatDetails> getSeatDetailsByFlightId(Long flightId);

    public void deleteAllSeatsByFlightId(Long flightId);
}
