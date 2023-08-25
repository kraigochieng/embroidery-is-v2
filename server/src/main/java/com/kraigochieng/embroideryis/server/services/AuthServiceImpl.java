package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.dtos.AuthorizationRequest;
import com.kraigochieng.embroideryis.server.dtos.AuthenticationRequest;
import com.kraigochieng.embroideryis.server.dtos.AuthResponse;
import com.kraigochieng.embroideryis.server.models.Role;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class AuthServiceImpl implements AuthService{
    @Autowired
    UserEntityServiceImpl userEntityServiceImpl; // Saving user, querying for user

    @Autowired
    JwtServiceImpl jwtServiceImpl; // To generate token

    @Autowired
    PasswordEncoder passwordEncoder; // To encode passwords for users registering
    // Login
    @Autowired
    AuthenticationManager authenticationManager; // To authenticate users logging in

    @Autowired
    UserDetailsService userDetailsService; // To create UAP token

    @Override
    public AuthResponse login(AuthorizationRequest authorizationRequest) {
        // Get user details
        UserDetails userDetails = userDetailsService.loadUserByUsername(authorizationRequest.getUsername());
        // Get token
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                authorizationRequest.getPassword(),
                userDetails.getAuthorities()
        );
        // Authenticate using up token
        authenticationManager.authenticate(authenticationToken); // this will authenticate for us

        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(jwtServiceImpl.generateToken(authenticationToken));
        authResponse.setAuthorities(extractAuthorities(authenticationToken));
        // Return JWT Token
        return authResponse;
    }

    @Override
    public AuthResponse register(AuthenticationRequest authenticationRequest) {
        // Save user
        userEntityServiceImpl.addUser(authenticationRequest);

        // Fetch User properly to get all credentials
        UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        // Generate token
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                userDetails.getPassword(),
                userDetails.getAuthorities()
        );

        // Create response
        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(jwtServiceImpl.generateToken(authenticationToken));
        authResponse.setAuthorities(extractAuthorities(authenticationToken));

        // Return token
        return authResponse;
    }


    // helper function
    public List<Role> extractAuthorities(UsernamePasswordAuthenticationToken authenticationToken) {
        return authenticationToken.getAuthorities().stream()
                .map(grantedAuthority -> Role.valueOf(grantedAuthority.getAuthority()))
                .toList();
    }
}
