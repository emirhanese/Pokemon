package tech.obss.jip.pokemon.dto;

import lombok.Getter;
import lombok.Setter;
import tech.obss.jip.pokemon.model.BaseModel;
import tech.obss.jip.pokemon.model.Role;

@Getter
@Setter
public class UserResponse extends BaseModel {
    private String username;
    private int age;
    private Role role;
}
