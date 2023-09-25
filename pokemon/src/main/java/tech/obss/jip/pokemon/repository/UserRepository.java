package tech.obss.jip.pokemon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tech.obss.jip.pokemon.model.User;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(String username);
    @Query(value = "SELECT * FROM users u WHERE u.username LIKE %?1%", nativeQuery = true)
    User searchByUsername(String username);
}
