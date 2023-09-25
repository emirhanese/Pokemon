package tech.obss.jip.pokemon.dto;

import lombok.*;
import tech.obss.jip.pokemon.model.BaseModel;
import tech.obss.jip.pokemon.model.Role;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    private String token;
}
