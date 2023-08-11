package com.airlines.service;

import java.util.List;

import com.airlines.handlers.ResourceNotAvailableException;
import com.airlines.handlers.ResourceNotFoundException;
import com.airlines.dto.BookingDto;
import com.airlines.entity.Booking;

public interface BookingService {
    public Booking addBooking(Booking booking) throws ResourceNotFoundException, ResourceNotAvailableException;

    public List<BookingDto> getBookings();

    public BookingDto getBookingById(Long bookingId);

    public void deleteBookingById(Long bookingId);

    public List<BookingDto> getBookingByUserId(Long customerId);

    public Booking updateBookingById(Booking booking, Long bookingId);
}
