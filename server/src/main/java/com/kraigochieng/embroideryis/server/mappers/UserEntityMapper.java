package com.kraigochieng.embroideryis.server.mappers;

import com.kraigochieng.embroideryis.server.dtos.AuthenticationRequest;
import com.kraigochieng.embroideryis.server.dtos.UserEntityDetails;
import com.kraigochieng.embroideryis.server.dtos.UserEntitySummary;
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

    public UserEntitySummary userEntityToUserEntitySummary(UserEntity userEntity) {
        UserEntitySummary userEntitySummary = new UserEntitySummary();

        userEntitySummary.setId(userEntity.getId());
        userEntitySummary.setUsername(userEntity.getUsername());
        userEntitySummary.setFirstName(userEntity.getFirstName());
        userEntitySummary.setLastName(userEntity.getLastName());

        return userEntitySummary;
    }
    public UserEntityDetails userEntityToUserEntityDetails(UserEntity userEntity) {
        UserEntityDetails userEntityDetails = new UserEntityDetails();
        // Profile
        userEntityDetails.setId(userEntity.getId());
        userEntityDetails.setFirstName(userEntity.getFirstName());
        userEntityDetails.setLastName(userEntity.getLastName());
        userEntityDetails.setUsername(userEntity.getUsername());
        userEntityDetails.setRoles(userEntity.getRoles());
        // Locks
        userEntityDetails.setAccountNonExpired(userEntity.isAccountNonExpired());
        userEntityDetails.setAccountNonLocked(userEntity.isAccountNonLocked());
        userEntityDetails.setEnabled(userEntity.isEnabled());
        userEntityDetails.setCredentialsNonExpired(userEntity.isCredentialsNonExpired());
        // Time stamps
        userEntityDetails.setCreatedAt(userEntity.getCreatedAt());
        userEntityDetails.setUpdatedAt(userEntity.getUpdatedAt());

        return  userEntityDetails;
    }
}
