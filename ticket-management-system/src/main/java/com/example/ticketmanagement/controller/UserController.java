package com.example.ticketmanagement.controller;

import com.example.ticketmanagement.dto.UserDTO;
import com.example.ticketmanagement.model.AuthenticationResponse;
import com.example.ticketmanagement.model.User;
import com.example.ticketmanagement.repository.UserRepository;
import com.example.ticketmanagement.service.UserService;
import com.example.ticketmanagement.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
        try {
            if (userRepository.findByIdUtilisateur(userDTO.getIdUtilisateur()) != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User ID already exists");
            }

            User savedUser = userService.save(userDTO);
            final UserDetails userDetails = userService.loadUserByUsername(savedUser.getIdUtilisateur());
            final String token = jwtTokenUtil.generateToken(userDetails);
            logger.info("User {} successfully registered", userDTO.getIdUtilisateur());
            return ResponseEntity.ok(new AuthenticationResponse(token, userDetails.getAuthorities().iterator().next().getAuthority()));
        } catch (Exception e) {
            logger.error("Error registering user: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering user: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {
        try {
            logger.info("Attempting to authenticate user: {}", userDTO.getIdUtilisateur());
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userDTO.getIdUtilisateur(), userDTO.getPassword())
            );
        } catch (BadCredentialsException e) {
            logger.error("Invalid user ID or password for user: {}", userDTO.getIdUtilisateur());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user ID or password");
        }

        final UserDetails userDetails = userService.loadUserByUsername(userDTO.getIdUtilisateur());
        final String token = jwtTokenUtil.generateToken(userDetails);

        logger.info("User {} successfully logged in", userDTO.getIdUtilisateur());
        return ResponseEntity.ok(new AuthenticationResponse(token, userDetails.getAuthorities().iterator().next().getAuthority()));
    }
}
