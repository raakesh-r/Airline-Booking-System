package com.airlines.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.airlines.dto.SeatTypeDTO;
import com.airlines.entity.SeatDetails;
import com.airlines.service.SeatTypeService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/seat")
@CrossOrigin("*")
public class SeatTypeController {
    @Autowired
    private SeatTypeService seatTypeService;

    @PostMapping("/add")
    public SeatDetails insertSeat(@Valid @RequestBody SeatDetails seatDetails) {
        return seatTypeService.insertSeat(seatDetails);
    }

    @GetMapping("/get/{id}")
    public SeatDetails getSeatDetailsById(@PathVariable("id") Long seatId) {
        return seatTypeService.getSeatDetailsById(seatId);
    }

    @GetMapping("/get")
    public List<SeatDetails> getAllSeatDetails() {
        return seatTypeService.getAllSeatDetails();
    }

    @PutMapping("/update")
    public SeatDetails updateSeatById(@Valid @RequestBody SeatDetails seatDetails) {
        return seatTypeService.updateSeatById(seatDetails, seatDetails.getSeatId());
    }

    @DeleteMapping("/delete/{seatId}")
    public String deleteSeatDetailsById(@PathVariable("seatId") Long seatId) {
        seatTypeService.deleteSeatDetailsById(seatId);
        return "Seat detail deleted!";
    }

    @GetMapping("/getseats/{flightId}")
    public List<SeatTypeDTO> getSeatsByFlightId(@PathVariable("flightId") Long flightId){
        return seatTypeService.getSeatsByFlightId(flightId);
    }

}
