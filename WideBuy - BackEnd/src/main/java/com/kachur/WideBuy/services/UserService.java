package com.kachur.WideBuy.services;

import com.kachur.WideBuy.common.RegistrationResponse;
import com.kachur.WideBuy.dao.UserRepository;
import com.kachur.WideBuy.entity.User;
import com.kachur.WideBuy.enums.AuthoritiesEnum;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public RegistrationResponse registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return new RegistrationResponse("This username is already taken!");
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setEnabled(true);
            user.addAuthority(user, AuthoritiesEnum.USER);
            userRepository.save(user);
            return new RegistrationResponse("Success!");
        }
    }
}
