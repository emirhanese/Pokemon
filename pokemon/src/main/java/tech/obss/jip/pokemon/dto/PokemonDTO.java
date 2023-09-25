package tech.obss.jip.pokemon.dto;

import lombok.*;
import tech.obss.jip.pokemon.model.BaseModel;
import tech.obss.jip.pokemon.model.PokemonGender;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PokemonDTO extends BaseModel {

    private String name;
    private Integer age;
    private Float height;
    private Float weight;
    private String type;
    private String gender;
    private String image;
}
