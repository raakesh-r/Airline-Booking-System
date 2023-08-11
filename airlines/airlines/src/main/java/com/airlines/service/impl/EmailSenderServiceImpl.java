package com.airlines.service.impl;

import com.airlines.constants.Constants;
import com.airlines.service.EmailSenderService;
import com.airlines.dto.BookingDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderServiceImpl implements EmailSenderService {

    @Autowired
    private JavaMailSender javaMailSender;

    public BookingDto sendBookingEmail(String toEmail, String body, String subject) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(Constants.SENDER_EMAIL);
        mailMessage.setTo(toEmail);
        mailMessage.setSubject(subject);
        mailMessage.setText(body);
        javaMailSender.send(mailMessage);
        return null;
    }
}
