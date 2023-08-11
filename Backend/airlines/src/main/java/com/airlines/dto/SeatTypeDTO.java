package com.airlines.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeatTypeDTO {
    private Long seatId;
    private Long flightId;
    private String seatType;
    private Long availableSeats;
    private Long price;
}
