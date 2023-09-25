package tech.obss.jip.pokemon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tech.obss.jip.pokemon.model.Pokemon;

import java.util.List;
import java.util.UUID;

@Repository
public interface PokemonRepository extends JpaRepository<Pokemon, UUID> {
    @Query(value = "SELECT * FROM pokemons p WHERE p.name LIKE %?1%", nativeQuery = true)
    Pokemon searchByName(String name);

    @Query(value = "SELECT * FROM pokemons p WHERE p.type LIKE %?1%", nativeQuery = true)
    List<Pokemon> searchPokemonsByType(String type);
}
