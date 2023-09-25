package tech.obss.jip.pokemon.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import tech.obss.jip.pokemon.dto.PokemonDTO;
import tech.obss.jip.pokemon.exception.ApplicationException;
import tech.obss.jip.pokemon.model.Pokemon;
import tech.obss.jip.pokemon.model.PokemonGender;
import tech.obss.jip.pokemon.repository.PokemonRepository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PokemonService {

    private final PokemonRepository pokemonRepository;
    private final ModelMapper modelMapper;

    public List<PokemonDTO> getPokemons() {
        return pokemonRepository.findAll().stream()
                .map(pokemon -> modelMapper.map(pokemon, PokemonDTO.class))
                .collect(Collectors.toList());
    }

    public PokemonDTO getPokemonById(UUID id) {
        return modelMapper.map(pokemonRepository.findById(id), PokemonDTO.class);
    }

    public PokemonDTO savePokemon(PokemonDTO pokemonDTO) {
        Pokemon pokemon = Pokemon.builder()
                .gender(PokemonGender.valueOf(pokemonDTO.getGender()))
                .age(pokemonDTO.getAge())
                .type(pokemonDTO.getType())
                .height(pokemonDTO.getHeight())
                .name(pokemonDTO.getName())
                .weight(pokemonDTO.getWeight())
                .image(pokemonDTO.getImage())
                .build();

        return modelMapper.map(pokemonRepository.save(pokemon), PokemonDTO.class);
    }

    public PokemonDTO updatePokemon(UUID id, PokemonDTO pokemonDTO) {
        Pokemon pokemonToBeUpdated = pokemonRepository.findById(id).
                orElseThrow(() -> new ApplicationException("Pokemon not found with given ID", HttpStatus.BAD_REQUEST));

        modelMapper.map(pokemonDTO, pokemonToBeUpdated);
        return modelMapper.map(pokemonRepository.save(pokemonToBeUpdated), PokemonDTO.class);
    }

    public PokemonDTO deletePokemon(UUID id) {
        PokemonDTO deletedPokemon = getPokemonById(id);
        pokemonRepository.deleteById(id);
        return deletedPokemon;
    }

    public List<PokemonDTO> searchPokemonsByType(String pokemonType) {
        return pokemonRepository.searchPokemonsByType(pokemonType).stream()
                .map(pokemon -> modelMapper.map(pokemon, PokemonDTO.class))
                .collect(Collectors.toList());
    }
}
