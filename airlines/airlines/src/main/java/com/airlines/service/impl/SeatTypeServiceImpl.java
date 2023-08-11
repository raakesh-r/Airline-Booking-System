package com.airlines.service.impl;

import com.airlines.repository.SeatDetailsRepository;
import com.airlines.service.SeatTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.airlines.dto.SeatTypeDTO;
import com.airlines.entity.SeatDetails;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class SeatTypeServiceImpl implements SeatTypeService {
    @Autowired
    private SeatDetailsRepository seatDetailsRepository;

    @Override
    public SeatDetails getSeatDetailsById(Long id) {
        return seatDetailsRepository.findById(id).get();
    }

    @Override
    public SeatDetails insertSeat(SeatDetails seatDetails) {
        seatDetailsRepository.save(seatDetails);
        return seatDetails;
    }

    @Override
    public List<SeatDetails> getAllSeatDetails() {
        return seatDetailsRepository.findAll();
    }

    @Override
    public SeatDetails updateSeatById(SeatDetails seatDetails, Long seatId) {
        SeatDetails seatDetailsDB = seatDetailsRepository.findById(seatId).get();
        if (Objects.nonNull(seatDetails.getSeatType()) && !"".equalsIgnoreCase(seatDetails.getSeatType()))
            seatDetailsDB.setSeatType(seatDetails.getSeatType());
        if (Objects.nonNull(seatDetails.getAvailableSeats()))
            seatDetailsDB.setAvailableSeats(seatDetails.getAvailableSeats());
        if (Objects.nonNull(seatDetails.getPrice()))
            seatDetailsDB.setPrice(seatDetails.getPrice());
        return seatDetailsRepository.save(seatDetailsDB);
    }

    @Override
    public void deleteSeatDetailsById(Long seatId) {
        seatDetailsRepository.deleteById(seatId);
    }

    @Override
    public List<SeatTypeDTO> getSeatsByFlightId(Long flightId) {
        List<SeatDetails> fetchedSeatDetails = seatDetailsRepository.getSeatDetailsByFlightId(flightId);
        List<SeatTypeDTO> seatTypeDTOList = new ArrayList<>();
        for (SeatDetails s : fetchedSeatDetails) {
            SeatTypeDTO seatTypeDTO = new SeatTypeDTO(s.getSeatId(), s.getFlightId(),s.getSeatType(), s.getAvailableSeats(), s.getPrice());
            seatTypeDTOList.add(seatTypeDTO);
        }
        return seatTypeDTOList;
    }
}
