package tech.obss.jip.pokemon.service;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tech.obss.jip.pokemon.dto.AuthenticationRequest;
import tech.obss.jip.pokemon.dto.AuthenticationResponse;
import tech.obss.jip.pokemon.dto.RegisterRequest;
import tech.obss.jip.pokemon.dto.UserResponse;
import tech.obss.jip.pokemon.model.Role;
import tech.obss.jip.pokemon.model.User;
import tech.obss.jip.pokemon.repository.UserRepository;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private final ModelMapper modelMapper;

    public UserResponse register(RegisterRequest registerRequest) {

        var user = User.builder()
                .username(registerRequest.getUsername())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .age(registerRequest.getAge())
                .role(Role.TRAINER)
                .build();

        return modelMapper.map(userRepository.save(user), UserResponse.class);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest,
                                               HttpServletResponse response) throws IOException {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()
                )
        );

        var user = userRepository.findByUsername(authenticationRequest.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
