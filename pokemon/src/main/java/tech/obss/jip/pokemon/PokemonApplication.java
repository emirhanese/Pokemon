package tech.obss.jip.pokemon;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import tech.obss.jip.pokemon.dto.RegisterRequest;
import tech.obss.jip.pokemon.model.Role;
import tech.obss.jip.pokemon.model.User;
import tech.obss.jip.pokemon.service.UserService;

@SpringBootApplication
@RequiredArgsConstructor
public class PokemonApplication {
	public static void main(String[] args) {
		SpringApplication.run(PokemonApplication.class, args);
	}
}
