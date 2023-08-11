package com.airlines.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.airlines.dto.LoginResponseDTO;
import com.airlines.dto.RegistrationDTO;
import com.airlines.entity.ApplicationUser;
import com.airlines.service.impl.AuthenticationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ApplicationUser registerUser(@Valid @RequestBody RegistrationDTO body) {
        return authenticationService.registerUser(body.getUsername(), body.getPassword(),body.getUserEmail(),body.getuserPhno());
    }

    @PostMapping("/login")
    public LoginResponseDTO loginUser(@Valid @RequestBody RegistrationDTO body) {
        return authenticationService.loginUser(body.getUsername(), body.getPassword());
    }
}
