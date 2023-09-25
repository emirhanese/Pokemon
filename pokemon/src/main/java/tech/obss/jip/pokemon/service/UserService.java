package tech.obss.jip.pokemon.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tech.obss.jip.pokemon.dto.PokemonDTO;
import tech.obss.jip.pokemon.dto.RegisterRequest;
import tech.obss.jip.pokemon.exception.ApplicationException;
import tech.obss.jip.pokemon.model.Pokemon;
import tech.obss.jip.pokemon.model.User;
import tech.obss.jip.pokemon.dto.UserResponse;
import tech.obss.jip.pokemon.repository.PokemonRepository;
import tech.obss.jip.pokemon.repository.UserRepository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PokemonRepository pokemonRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    public List<UserResponse> getUsers() {
       return userRepository.findAll()
               .stream()
               .map(user -> modelMapper.map(user, UserResponse.class))
               .collect(Collectors.toList());
    }

    public UserResponse getUserById(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow();

        return modelMapper.map(user, UserResponse.class);
    }

    public UserResponse saveUser(RegisterRequest registerRequest) {
        User userToBeSaved = new User();
        userToBeSaved.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        userToBeSaved.setAge(registerRequest.getAge());
        userToBeSaved.setRole(registerRequest.getRole());
        userToBeSaved.setUsername(registerRequest.getUsername());
        userRepository.save(userToBeSaved);
        return modelMapper.map(userToBeSaved, UserResponse.class);
    }

    public UserResponse deleteUser(UUID id) {
        userRepository.deleteById(id);
        return getUserById(id);
    }

    public UserResponse updateUser(UUID id, RegisterRequest registerRequest) {
        User userToBeUpdated = userRepository.findById(id)
                .orElseThrow();

        modelMapper.map(registerRequest, userToBeUpdated);
        userRepository.save(userToBeUpdated);

        return modelMapper.map(userToBeUpdated, UserResponse.class);
    }

    public UserResponse searchUser(String username) {
        return modelMapper.map(userRepository.searchByUsername(username), UserResponse.class);
    }

    public PokemonDTO addToCatchList(String username, UUID pokemonID) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ApplicationException("User not found with given ID", HttpStatus.NOT_FOUND));
        Pokemon pokemonToBeCatched = pokemonRepository.findById(pokemonID)
                .orElseThrow(() -> new ApplicationException("Pokemon not found with given ID", HttpStatus.NOT_FOUND));

        user.getCatchedPokemons().add(pokemonToBeCatched);
        userRepository.save(user);

        return modelMapper.map(pokemonToBeCatched, PokemonDTO.class);
    }

    public PokemonDTO addToWishList(String username, UUID pokemonID) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ApplicationException("User not found with given ID", HttpStatus.NOT_FOUND));
        Pokemon pokemonToBeWished = pokemonRepository.findById(pokemonID)
                .orElseThrow(() -> new ApplicationException("Pokemon not found with given ID", HttpStatus.NOT_FOUND));

        user.getWishedPokemons().add(pokemonToBeWished);
        userRepository.save(user);

        return modelMapper.map(pokemonToBeWished, PokemonDTO.class);
    }

    public PokemonDTO removeFromCatchList(String username, UUID pokemonID) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ApplicationException("User not found with given ID", HttpStatus.NOT_FOUND));
        Pokemon pokemonToBeDeleted = pokemonRepository.findById(pokemonID)
                .orElseThrow(() -> new ApplicationException("Pokemon not found with given ID", HttpStatus.NOT_FOUND));

        user.getCatchedPokemons().remove(pokemonToBeDeleted);
        userRepository.save(user);

        return modelMapper.map(pokemonToBeDeleted, PokemonDTO.class);
    }

    public PokemonDTO removeFromWishList(String username, UUID pokemonID) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ApplicationException("User not found with given ID", HttpStatus.NOT_FOUND));
        Pokemon pokemonToBeDeleted = pokemonRepository.findById(pokemonID)
                .orElseThrow(() -> new ApplicationException("Pokemon not found with given ID", HttpStatus.NOT_FOUND));

        user.getWishedPokemons().remove(pokemonToBeDeleted);
        userRepository.save(user);

        return modelMapper.map(pokemonToBeDeleted, PokemonDTO.class);
    }

    public List<PokemonDTO> getCatchedPokemons(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ApplicationException("User not found with thid ID!", HttpStatus.NOT_FOUND));
        return user.getCatchedPokemons().stream()
                .map(pokemon -> modelMapper.map(pokemon, PokemonDTO.class))
                .collect(Collectors.toList());
    }

    public List<PokemonDTO> getWishedPokemons(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ApplicationException("User not found with thid ID!", HttpStatus.NOT_FOUND));
        return user.getWishedPokemons().stream()
                .map(pokemon -> modelMapper.map(pokemon, PokemonDTO.class))
                .collect(Collectors.toList());
    }
}
