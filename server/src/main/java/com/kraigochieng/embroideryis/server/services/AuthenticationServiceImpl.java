package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.authentication.LoginRequest;
import com.kraigochieng.embroideryis.server.authentication.RegisterRequest;
import com.kraigochieng.embroideryis.server.models.User;
import com.kraigochieng.embroideryis.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl {
    // Saving user, querying for user
    private final UserRepository userRepository;
    // To Generate Tokens
    private final JwtServiceImpl jwtServiceImpl;
    // To encode password input by user
    private final PasswordEncoder passwordEncoder;
    // Login
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    public String login(LoginRequest loginRequest) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, loginRequest.getPassword(),userDetails.getAuthorities());
        authenticationManager.authenticate(authenticationToken);
        String token = jwtServiceImpl.generateToken(authenticationToken);
        return token;
    }

    public String register(RegisterRequest registerRequest) {
        // Make user
        User user = User.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .username(registerRequest.getUsername())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .roles(registerRequest.getRoles())
                .build();

        // Save user
        userRepository.save(user);
        // Generate token
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(registerRequest.getUsername(), registerRequest.getPassword());
        String token = jwtServiceImpl.generateToken(authenticationToken);
        // Return token
        return token;
    }
}
