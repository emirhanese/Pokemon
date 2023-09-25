package tech.obss.jip.pokemon.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.obss.jip.pokemon.dto.PokemonDTO;
import tech.obss.jip.pokemon.dto.RegisterRequest;
import tech.obss.jip.pokemon.dto.UserResponse;
import tech.obss.jip.pokemon.service.UserService;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserResponse>> getUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable UUID id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<UserResponse> saveUser(@RequestBody RegisterRequest registerRequest) {
        return new ResponseEntity<>(userService.saveUser(registerRequest), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable UUID id,
                                                   @RequestBody RegisterRequest registerRequest) {
        return new ResponseEntity<>(userService.updateUser(id, registerRequest), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UserResponse> deleteUser(@PathVariable UUID id) {
        return new ResponseEntity<>(userService.deleteUser(id), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<UserResponse> searchUser(@RequestParam("username") String username) {
        return new ResponseEntity<>(userService.searchUser(username), HttpStatus.OK);
    }

    @GetMapping("/catchList/{username}")
    public ResponseEntity<List<PokemonDTO>> getCatchedPokemons(@PathVariable String username) {
        return new ResponseEntity<>(userService.getCatchedPokemons(username), HttpStatus.OK);
    }

    @PostMapping("/catchList/add")
    public ResponseEntity<PokemonDTO> addToCatchList(@RequestParam String username, @RequestParam UUID pokemonID) {
        return new ResponseEntity<>(userService.addToCatchList(username, pokemonID), HttpStatus.OK);
    }

    @DeleteMapping("/catchList/remove")
    public ResponseEntity<PokemonDTO> removeFromCatchList(@RequestParam String username, @RequestParam UUID pokemonID) {
        return new ResponseEntity<>(userService.removeFromCatchList(username, pokemonID), HttpStatus.OK);
    }

    @GetMapping("/wishList/{username}")
    public ResponseEntity<List<PokemonDTO>> getWishedPokemons(@PathVariable String username) {
        return new ResponseEntity<>(userService.getWishedPokemons(username), HttpStatus.OK);
    }

    @PostMapping("/wishList/add")
    public ResponseEntity<PokemonDTO> addToWishList(@RequestParam String username, @RequestParam UUID pokemonID) {
        return new ResponseEntity<>(userService.addToWishList(username, pokemonID), HttpStatus.OK);
    }

    @DeleteMapping("/wishList/remove")
    public ResponseEntity<PokemonDTO> removeFromWishList(@RequestParam String username, @RequestParam UUID pokemonID) {
        return new ResponseEntity<>(userService.removeFromWishList(username, pokemonID), HttpStatus.OK);
    }
}
