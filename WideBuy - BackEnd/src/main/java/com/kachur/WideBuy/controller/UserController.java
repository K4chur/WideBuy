package com.kachur.WideBuy.controller;

import com.kachur.WideBuy.common.RegistrationResponse;
import com.kachur.WideBuy.entity.User;
import com.kachur.WideBuy.services.UserService;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
public class UserController {

    private final UserService userService;
    private final JwtEncoder encoder;
    public UserController(UserService userService, JwtEncoder encoder) {
        this.userService = userService;
        this.encoder = encoder;
    }


    @PostMapping("/signIn")
    public String auth(Authentication authentication) {
        Instant now = Instant.now();
        long expiry = 36000L;
        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        String username = authentication.getName();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(authentication.getName())
                .claim("scope", scope)
                .claim("username", username)
                .build();
        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
    @PostMapping("/signUp")
    public RegistrationResponse register(@RequestBody User user){
        System.out.println(user.getPassword());
        return userService.registerUser(user);
    }
}
