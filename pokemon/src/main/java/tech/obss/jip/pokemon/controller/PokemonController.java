package tech.obss.jip.pokemon.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.obss.jip.pokemon.dto.PokemonDTO;
import tech.obss.jip.pokemon.service.PokemonService;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/v1/pokemons")
public class PokemonController {

    private final PokemonService pokemonService;

    @GetMapping
    public ResponseEntity<List<PokemonDTO>> getPokemons() {
        return new ResponseEntity<>(pokemonService.getPokemons(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PokemonDTO> getPokemonById(@PathVariable UUID id) {
        return new ResponseEntity<>(pokemonService.getPokemonById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PokemonDTO> savePokemon(@RequestBody PokemonDTO pokemonDTO) {
        return new ResponseEntity<>(pokemonService.savePokemon(pokemonDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PokemonDTO> updatePokemon(@PathVariable UUID id,
                                                   @RequestBody PokemonDTO pokemonDTO) {
        return new ResponseEntity<>(pokemonService.updatePokemon(id, pokemonDTO), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PokemonDTO> deletePokemon(@PathVariable UUID id) {
        return new ResponseEntity<>(pokemonService.deletePokemon(id), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<PokemonDTO>> searchPokemonsByType(@RequestParam("pokemonType") String pokemonType) {
        return new ResponseEntity<>(pokemonService.searchPokemonsByType(pokemonType), HttpStatus.OK);
    }
}
