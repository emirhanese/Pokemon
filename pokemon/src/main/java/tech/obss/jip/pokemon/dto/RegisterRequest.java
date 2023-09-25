package tech.obss.jip.pokemon.dto;

import lombok.*;
import tech.obss.jip.pokemon.model.Role;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String username;
    private String password;
    private int age;
    private Role role;
}
