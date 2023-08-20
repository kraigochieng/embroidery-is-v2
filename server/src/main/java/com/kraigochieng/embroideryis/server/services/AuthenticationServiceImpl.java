package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.authentication.LoginRequest;
import com.kraigochieng.embroideryis.server.authentication.RegisterRequest;
import com.kraigochieng.embroideryis.server.models.User;
import com.kraigochieng.embroideryis.server.repositories.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
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
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, loginRequest.getPassword(),userDetails.getAuthorities());
        authenticationManager.authenticate(authenticationToken);
        String token = jwtServiceImpl.generateToken(authenticationToken);
        return token;
    }

    public String register(RegisterRequest registerRequest) {
        // Make user
        User user = new User();
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRoles(registerRequest.getRoles());

        // Save user
        userRepository.save(user);
        // Generate token
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(registerRequest.getUsername(), registerRequest.getPassword());
        String token = jwtServiceImpl.generateToken(authenticationToken);
        // Return token
        return token;
    }
}
