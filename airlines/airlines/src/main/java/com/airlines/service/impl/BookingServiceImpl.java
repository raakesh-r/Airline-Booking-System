package com.airlines.service.impl;

import com.airlines.constants.Constants;
import com.airlines.handlers.ResourceNotAvailableException;
import com.airlines.repository.BookingRepository;
import com.airlines.repository.FlightRepository;
import com.airlines.repository.SeatDetailsRepository;
import com.airlines.repository.UserRepository;
import com.airlines.service.BookingService;
import com.airlines.dto.BookingDto;
import com.airlines.entity.ApplicationUser;
import com.airlines.entity.Booking;
import com.airlines.entity.Flight;
import com.airlines.entity.SeatDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private FlightRepository flightRepository;
    @Autowired
    private EmailSenderServiceImpl senderService;
    @Autowired
    private SeatDetailsRepository seatDetailsRepository;
    @Autowired
    private UserRepository userRepository;
    @Override
    public Booking addBooking(Booking booking) throws ResourceNotAvailableException {
        Optional<ApplicationUser> user = userRepository.findById(booking.getCustomerId());
        SeatDetails s = seatDetailsRepository.getAvailableSeatsByFlightIdAndSeatType(booking.getFlightId(), booking.getSeatType());
        if (booking.getNop() <= s.getAvailableSeats()) {
            s.setAvailableSeats(s.getAvailableSeats() - booking.getNop());
            booking.setTotalPrice(s.getPrice() * booking.getNop());
            bookingRepository.save(booking);
            Flight f = flightRepository.findById(booking.getFlightId()).orElse(null);
            BookingDto bookingDto = new BookingDto(booking.getBookingId(),booking.getFlightId(),f.getFlightName(), f.getTakeOffTime(),user.get().getUsername(), booking.getSeatType(), booking.getOrigin(), booking.getDestination(), booking.getDate(), booking.getNop(), booking.getTotalPrice());
            senderService.sendBookingEmail(user.get().getUserEmail(), Constants.GREETING_MSG + bookingDto.toString()+ Constants.CONFIRM_MSG, Constants.BOOK_MAIL_SUBJECT);
            return booking;
        } else {
            throw new ResourceNotAvailableException("Only " + s.getAvailableSeats() + " Seats are currently available.");
        }
    }

    @Override
    public List<BookingDto> getBookings() {
        List<Booking> fetchedBookingList = bookingRepository.findAll();
        List<BookingDto> bookingDtoList = new ArrayList<>();
        for (Booking b : fetchedBookingList) {
            ApplicationUser customer = userRepository.findById(b.getCustomerId()).orElse(null);
            SeatDetails seatDetails = seatDetailsRepository.findById(b.getFlightId()).orElse(null);
            Flight f = flightRepository.findById(b.getFlightId()).orElse(null);
            BookingDto bookingDto = new BookingDto(b.getBookingId(), b.getFlightId(), f.getFlightName(),f.getTakeOffTime(), customer.getUsername(), b.getSeatType(), b.getOrigin(),b.getDestination(), b.getDate(), b.getNop(), b.getTotalPrice());
            bookingDtoList.add(bookingDto);
        }
        return bookingDtoList;
    }

    @Override
    public BookingDto getBookingById(Long bookingId) {
        Booking b = bookingRepository.findById(bookingId).orElse(null);
        if (b != null) {
            ApplicationUser customer = userRepository.findById(b.getCustomerId()).orElse(null);
            SeatDetails seatType = seatDetailsRepository.findById(b.getFlightId()).orElse(null);
            Flight f = flightRepository.findById(b.getFlightId()).orElse(null);
            BookingDto bookingDto = new BookingDto(b.getBookingId(), b.getFlightId(), f.getFlightName(), f.getTakeOffTime(),customer.getUsername(), b.getSeatType(), b.getOrigin(),b.getDestination() , b.getDate(),b.getNop(), b.getTotalPrice());
            return bookingDto;
        }
        return null;
    }

    @Override
    public void deleteBookingById(Long bookingId) {
        Booking b = bookingRepository.findById(bookingId).orElse(null);
        Optional<ApplicationUser> user = userRepository.findById(b.getCustomerId());
        Flight f = flightRepository.findById(b.getFlightId()).orElse(null);
        SeatDetails seatDetails = seatDetailsRepository.getAvailableSeatsByFlightIdAndSeatType(b.getFlightId(),b.getSeatType());
        seatDetails.setAvailableSeats(seatDetails.getAvailableSeats() + b.getNop());
        seatDetailsRepository.save(seatDetails);
        BookingDto bookingDto = new BookingDto(b.getBookingId(), b.getFlightId(), f.getFlightName(), f.getTakeOffTime(),user.get().getUsername(), seatDetails.getSeatType(), b.getOrigin(), b.getDestination(), b.getDate(),b.getNop(), b.getTotalPrice());
        senderService.sendBookingEmail(user.get().getUserEmail(), Constants.CANCEL_MSG + bookingDto.toString() + Constants.CANCEL_STATUS_MSG, Constants.CANCEL_SUBJECT);
        bookingRepository.deleteById(bookingId);
    }



    @Override
    public List<BookingDto> getBookingByUserId(Long customerId) {
        List<Booking> fetchedBookingDetails = bookingRepository.getAllBookingsByCustomerId(customerId);
        List<BookingDto> bookingDtoList = new ArrayList<>();
        for (Booking b : fetchedBookingDetails) {
            ApplicationUser customer = userRepository.findById(b.getCustomerId()).orElse(null);
            Flight f = flightRepository.findById(b.getFlightId()).orElse(null);
            BookingDto bookingDto = new BookingDto(b.getBookingId(), b.getFlightId(), f.getFlightName(),f.getTakeOffTime(), customer.getUsername(), b.getSeatType(), b.getOrigin(), b.getDestination(),b.getDate(), b.getNop(), b.getTotalPrice());
            bookingDtoList.add(bookingDto);
        }
        return bookingDtoList;
    }

    @Override
    public Booking updateBookingById(Booking booking, Long bookingId) {
        Booking bookingDb = bookingRepository.findById(bookingId).get();
        Optional<ApplicationUser> user = userRepository.findById(bookingDb.getCustomerId());
        if (Objects.nonNull(booking.getFlightId())) {
            bookingDb.setFlightId(booking.getFlightId());
            senderService.sendBookingEmail(user.get().getUserEmail(), Constants.BOOKING_CHANGE_MSG+bookingDb.getBookingId()+ "\n\nFLight ID: "+ bookingDb.getFlightId(), Constants.BOOKING_CHANGE_SUBJECT);
        }
        if (Objects.nonNull(booking.getSeatType()) && !"".equalsIgnoreCase(booking.getSeatType())) {
            SeatDetails seatDetailsDB1 = seatDetailsRepository.getAvailableSeatsByFlightIdAndSeatType(bookingDb.getFlightId(), bookingDb.getSeatType());
            seatDetailsDB1.setAvailableSeats(seatDetailsDB1.getAvailableSeats() + bookingDb.getNop());
            bookingDb.setSeatType(booking.getSeatType());
            senderService.sendBookingEmail(user.get().getUserEmail(), Constants.BOOKING_CHANGE_MSG+bookingDb.getBookingId()+ "\n\nSeat Type: "+bookingDb.getSeatType(), Constants.BOOKING_CHANGE_SUBJECT);
            SeatDetails seatDetailsDB = seatDetailsRepository.getAvailableSeatsByFlightIdAndSeatType(bookingDb.getFlightId(), bookingDb.getSeatType());
            bookingDb.setTotalPrice(seatDetailsDB.getPrice() * bookingDb.getNop());
            seatDetailsDB.setAvailableSeats(seatDetailsDB.getAvailableSeats() - bookingDb.getNop());
            seatDetailsRepository.save(seatDetailsDB);
        }
        if (Objects.nonNull(booking.getOrigin()) && !"".equalsIgnoreCase(booking.getOrigin())) {
            bookingDb.setOrigin(booking.getOrigin());
            senderService.sendBookingEmail(user.get().getUserEmail(), Constants.BOOKING_CHANGE_MSG+ bookingDb.getBookingId()+"\n\nOrigin: "+bookingDb.getOrigin(), Constants.BOOKING_CHANGE_SUBJECT);
        }
        if (Objects.nonNull(booking.getDestination()) && !"".equalsIgnoreCase(booking.getDestination())) {
            bookingDb.setDestination(booking.getDestination());
            senderService.sendBookingEmail(user.get().getUserEmail(), Constants.BOOKING_CHANGE_MSG+ bookingDb.getBookingId()+"\n\nDestination: "+bookingDb.getDestination(), Constants.BOOKING_CHANGE_SUBJECT);
        }
        if (Objects.nonNull(booking.getDate()) && !"".equalsIgnoreCase(booking.getDate())) {
            bookingDb.setDate(booking.getDate());
            senderService.sendBookingEmail(user.get().getUserEmail(), Constants.BOOKING_CHANGE_MSG+bookingDb.getBookingId() +"\n\nDate: "+bookingDb.getDate(), Constants.BOOKING_CHANGE_SUBJECT);
        }
        if (Objects.nonNull(booking.getNop())) {
            SeatDetails seatDetailsDB1 = seatDetailsRepository.getAvailableSeatsByFlightIdAndSeatType(bookingDb.getFlightId(), bookingDb.getSeatType());
            seatDetailsDB1.setAvailableSeats(seatDetailsDB1.getAvailableSeats() + bookingDb.getNop());
            bookingDb.setNop(booking.getNop());
            senderService.sendBookingEmail(user.get().getUserEmail(), Constants.BOOKING_CHANGE_MSG+ bookingDb.getBookingId()+ "\n\nNOP: " + bookingDb.getNop(), Constants.BOOKING_CHANGE_SUBJECT);
            SeatDetails seatDetailsDB = seatDetailsRepository.getAvailableSeatsByFlightIdAndSeatType(bookingDb.getFlightId(), bookingDb.getSeatType());
            bookingDb.setTotalPrice(seatDetailsDB.getPrice() * bookingDb.getNop());
            seatDetailsDB.setAvailableSeats(seatDetailsDB.getAvailableSeats() - bookingDb.getNop());
            seatDetailsRepository.save(seatDetailsDB);
        }
        return bookingRepository.save(bookingDb);
    }
}
