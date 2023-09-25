import { useState } from "react";
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { useLocalState } from "../util/useLocalStorage";


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
        backgroundColor: "#fafafa",
        margin: 20,
    },
    media: {
        height: 350,
    },
});

const Pokemon = (props) => {

    const { id, name, age, height, weight, type, gender, image, isUserAdmin, isLiked, isCatched, pokemons, setPokemons } = props;

    const [auth, setAuth] = useLocalState(null, "auth");
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(isLiked);
    const [catched, setCatched] = useState(isCatched);

    async function deletePokemon() {
        await fetch(`http://localhost:8080/api/v1/pokemons/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            method: "DELETE",
        }).then(response => {
            if (response.status === 200) return response.json();
            else if (response.status === 403) window.location.href = "login";
        }).then(deletedPokemon => {
            setPokemons(pokemons.filter((pokemon) => {
                return pokemon.id !== deletedPokemon.id;
            }));
        });
    }

    async function addPokemonToWishList() {
        await fetch(`http://localhost:8080/api/v1/users/wishList/add?username=${auth.username}&pokemonID=${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            method: "POST",
        }).then(response => {
            if (response.status === 200) return response.json();
            else if (response.status === 403) window.location.href = "login";
        }).then(pokemonAddedToWishList => {
            console.log("Pokemon added to wishlist: ", pokemonAddedToWishList);
        });
    }

    async function addPokemonToCatchList() {
        await fetch(`http://localhost:8080/api/v1/users/catchList/add?username=${auth.username}&pokemonID=${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            method: "POST",
        }).then(response => {
            if (response.status === 200) return response.json();
            else if (response.status === 403) window.location.href = "login";
        }).then(pokemonAddedToCatchList => {
            console.log("Pokemon added to catch list: ", pokemonAddedToCatchList);
        });
    }

    async function removePokemonFromCatchList() {
        await fetch(`http://localhost:8080/api/v1/users/catchList/remove?username=${auth.username}&pokemonID=${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            method: "DELETE",
        }).then(response => {
            if (response.status === 200) return response.json();
            else if (response.status === 403) window.location.href = "login";
        }).then(pokemonRemovedFromCatchList => {
            console.log("Pokemon removed from catch list: ", pokemonRemovedFromCatchList);
        });
    }

    async function removePokemonFromWishList() {
        await fetch(`http://localhost:8080/api/v1/users/wishList/remove?username=${auth.username}&pokemonID=${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            method: "DELETE",
        }).then(response => {
            if (response.status === 200) return response.json();
            else if (response.status === 403) window.location.href = "login";
        }).then(pokemonRemovedFromWishList => {
            console.log("Pokemon removed from wishlist: ", pokemonRemovedFromWishList);
        });
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleLikeClick = () => {
        setLiked(!liked);
        
        if(!liked) {
            addPokemonToWishList();
        }
        else {
            removePokemonFromWishList();
        }
    };

    const handleCatchPokemon = () => {
        setCatched(!catched);
        if(!catched) {
            addPokemonToCatchList();
        }
        else {
            removePokemonFromCatchList();
        }
    };

    const handleDeletePokemon = () => {
        deletePokemon();
    };

    const classes = useStyles();

    return (
        <div>
            <Card className={classes.card}>
                <CardMedia className={classes.media}
                    component="img"
                    height="194"
                    image={image}
                    alt={name}
                />
                <CardContent>
                    <Typography color="primary" variant="h5">
                        {name}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle2">
                        {type}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        onClick={handleLikeClick}
                        aria-label="add to favorites">
                        <FavoriteIcon style={liked ? { color: "red" } : null} />
                    </IconButton>
                    <IconButton
                        onClick={handleCatchPokemon}
                        aria-label="catch the pokemon">
                        <CatchingPokemonIcon style={catched ? { color: "green" } : null} />
                    </IconButton>
                    {isUserAdmin && (
                        <IconButton
                            onClick={handleDeletePokemon}
                            aria-label="delete the pokemon">
                            <DeleteIcon />
                        </IconButton>
                    )}
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse style={{ alignItems: "center", padding: "5px" }} in={expanded} timeout="auto" unmountOnExit>
                    <CardContent style={{ textAlign: "center" }}>
                        <Typography>
                            Age: {age}
                        </Typography>
                        <Typography>
                            Height: {height}
                        </Typography>
                        <Typography>
                            Weight: {weight}
                        </Typography>
                        <Typography>
                            Gender: {gender}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
};

export default Pokemon;