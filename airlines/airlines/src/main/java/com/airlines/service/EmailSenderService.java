package com.airlines.service;

import com.airlines.dto.BookingDto;

public interface EmailSenderService {
    public BookingDto sendBookingEmail(String toEmail, String body, String subject);
}
