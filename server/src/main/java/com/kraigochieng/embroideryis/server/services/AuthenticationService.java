package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.authentication.LoginRequest;
import com.kraigochieng.embroideryis.server.authentication.RegisterRequest;
import com.kraigochieng.embroideryis.server.models.User;
import com.kraigochieng.embroideryis.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    // Saving user, querying for user
    private final UserRepository userRepository;
    // To Generate Tokens
    private final JwtService jwtService;
    // To encode password input by user
    private final PasswordEncoder passwordEncoder;
    // Login
    private final AuthenticationManager authenticationManager;

    public String login(LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());
        authenticationManager.authenticate(authenticationToken);
        String token = jwtService.generateToken(authenticationToken);
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
        String token = jwtService.generateToken(authenticationToken);
        // Return token
        return token;
    }
}
