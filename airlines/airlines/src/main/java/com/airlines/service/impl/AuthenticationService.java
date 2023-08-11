package com.airlines.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.airlines.repository.RoleRepository;
import com.airlines.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.airlines.dto.LoginResponseDTO;
import com.airlines.entity.ApplicationUser;
import com.airlines.entity.Role;

@Service
@Transactional
public class AuthenticationService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;
    public ApplicationUser registerUser(String username, String password, String userEmail, String userPhno) {
        String encodedPassword = passwordEncoder.encode(password);
        Role userRole = roleRepository.findByAuthority("USER").get();
        List<Role> authorities = new ArrayList<>();
        authorities.add(userRole);
        return userRepository.save(new ApplicationUser((long) 0, username, encodedPassword, userEmail, userPhno, authorities));
    }

    public LoginResponseDTO loginUser(String username, String password) {
        try {
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            String token = tokenService.generateJwt(auth);
            return new LoginResponseDTO(userRepository.findByUsername(username).get(), token);
        } catch (AuthenticationException e) {
            return new LoginResponseDTO(null, "");
        }
    }
}
