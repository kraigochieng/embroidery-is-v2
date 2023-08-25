package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.authentication.LoginRequest;
import com.kraigochieng.embroideryis.server.authentication.RegisterRequest;
import com.kraigochieng.embroideryis.server.mappers.UserMapper;
import com.kraigochieng.embroideryis.server.models.User;
import com.kraigochieng.embroideryis.server.repositories.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationServiceImpl {
    // Saving user, querying for user
    @Autowired
    UserRepository userRepository;
    // To Generate Tokens
    @Autowired
    JwtServiceImpl jwtServiceImpl;
    // To encode password input by user
    @Autowired
    PasswordEncoder passwordEncoder;
    // Login
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserDetailsService userDetailsService;

    public String login(LoginRequest loginRequest) {
        // Get user details
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
        // Get token
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, loginRequest.getPassword(),userDetails.getAuthorities());
        // Authenticate using up token
        authenticationManager.authenticate(authenticationToken);
        // Return JWT Token
        return jwtServiceImpl.generateToken(authenticationToken);
    }

    public String register(RegisterRequest registerRequest) {

        // Make user
        User user = UserMapper.INSTANCE.registerRequestToUser(registerRequest, passwordEncoder.encode(registerRequest.getPassword()));

        // Save user
        userRepository.save(user);
        // Generate token
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(registerRequest.getUsername(), registerRequest.getPassword());
        // Return token
        return jwtServiceImpl.generateToken(authenticationToken);
    }
}
