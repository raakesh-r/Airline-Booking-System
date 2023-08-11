package com.airlines.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.airlines.entity.Booking;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    //    @Query(value = "select * from booking where customer_id = ?1", nativeQuery = true)
    public List<Booking> getAllBookingsByCustomerId(Long customerId);

    public void deleteAllBookingsByFlightId(Long flightId);

    public void deleteAllBookingsByCustomerId(Long userId);
}
