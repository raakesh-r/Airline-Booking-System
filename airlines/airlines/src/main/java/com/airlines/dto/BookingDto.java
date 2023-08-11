package com.airlines.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDto {
    private Long bookingId;
    private Long flightId;
    private String flightName;
    private String takeOffTime;
    private String customerName;
    private String seatType;
    private String origin;
    private String destination;
    private String date;
    private Long nop;
    private Long totalPrice;

    public String toString() {// overriding the toString() method
        return "Booking Id: " + bookingId + "\nFlight Id: " + flightId + "\nFlight Name: " + flightName
                + "\nTake Off time: " + takeOffTime + "\nCustomer name: " + customerName + "\nSeat Type: " + seatType
                + "\nOrigin: " + origin + "\nDestination: " + destination + "\nDate of Journey: " + date
                + "\nNo. of People: " + nop + "\nTotal Price: " + totalPrice;
    }
}
