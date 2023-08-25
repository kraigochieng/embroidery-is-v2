package com.kraigochieng.embroideryis.server.mappers;

import com.kraigochieng.embroideryis.server.dtos.AuthenticationRequest;
import com.kraigochieng.embroideryis.server.models.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserEntityMapper {
    @Autowired
    PasswordEncoder passwordEncoder;

    public UserEntity registerRequestToUserEntity(AuthenticationRequest authenticationRequest) {
        UserEntity userEntity = new UserEntity();
        userEntity.setFirstName(authenticationRequest.getFirstName());
        userEntity.setLastName(authenticationRequest.getLastName());
        userEntity.setUsername(authenticationRequest.getUsername());
        userEntity.setPassword(passwordEncoder.encode(authenticationRequest.getPassword()));
        userEntity.setRoles(authenticationRequest.getRoles());
        return userEntity;
    }
}
