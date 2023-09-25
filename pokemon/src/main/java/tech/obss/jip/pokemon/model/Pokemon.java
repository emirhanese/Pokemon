package tech.obss.jip.pokemon.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@DynamicUpdate
@DynamicInsert
@Table(name = "pokemons")
public class Pokemon extends BaseModel {
    @Column(length = 50, unique = true)
    private String name;
    private Integer age;
    private Float height;
    private Float weight;
    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private PokemonGender gender;
    private String image;
    @Column(length = 25)
    private String type;
    @ManyToMany(mappedBy = "catchedPokemons", cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private Set<User> owners;
    @ManyToMany(mappedBy = "wishedPokemons", cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private Set<User> wishers;
    @PreRemove
    private void removeOwners() {
        for (User user: this.owners) {
            user.getCatchedPokemons().remove(this);
        }
        for (User user: this.wishers) {
            user.getWishedPokemons().remove(this);
        }
    }
}
