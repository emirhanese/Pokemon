package tech.obss.jip.pokemon.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.obss.jip.pokemon.dto.AuthenticationRequest;
import tech.obss.jip.pokemon.dto.AuthenticationResponse;
import tech.obss.jip.pokemon.dto.RegisterRequest;
import tech.obss.jip.pokemon.dto.UserResponse;
import tech.obss.jip.pokemon.service.AuthService;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(
            @RequestBody RegisterRequest registerRequest
    ) {
        return new ResponseEntity<>(authService.register(registerRequest), HttpStatus.CREATED);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest authenticationRequest,
            HttpServletResponse response
    ) throws IOException {
        return new ResponseEntity<>(authService.authenticate(authenticationRequest, response), HttpStatus.OK);
    }
}
