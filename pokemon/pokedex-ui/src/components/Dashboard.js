import { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { makeStyles } from '@mui/styles';
import { Grid, Typography } from '@mui/material';
import Pokemon from "./Pokemon";
import jwt_decode from 'jwt-decode';

const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: "center",
    },

    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f5ff",
        padding: "10px 10px",
    },

    pokemonBox: {
        margin: 20,
    },

    button: {
        margin: 20,
        color: "red",
    }
}));

const Dashboard = () => {

    const [auth, setAuth] = useLocalState(null, "auth");
    const [isUserAdmin, setUserAdmin] = useState(false);
    const [pokemons, setPokemons] = useState([]);
    const [likedPokemons, setLikedPokemons] = useState([]);
    const [catchedPokemons, setCatchedPokemons] = useState([]);

    const classes = useStyles();

    async function getLikedPokemons() {
        await fetch(`http://localhost:8080/api/v1/users/wishList/${auth.username}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            method: "GET",
        }).then(response => {
            if (response.status === 200) return response.json();
            else if (response.status === 403) window.location.href = "login";
        }).then(wishedPokemons => {
            setLikedPokemons(wishedPokemons);
            console.log("Got wished pokemons!");
        });
    }

    async function getCatchedPokemons() {
        await fetch(`http://localhost:8080/api/v1/users/catchList/${auth.username}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            method: "GET",
        }).then(response => {
            if (response.status === 200) return response.json();
            else if (response.status === 403) window.location.href = "login";
        }).then(catchedPokemons => {
            setCatchedPokemons(catchedPokemons);
            console.log("Got catched pokemons!");
        });
    }

    async function getPokemons() {
        fetch("http://localhost:8080/api/v1/pokemons", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            method: "GET",
        }).then(response => {
            if (response.status === 200) return response.json();
            else if (response.status === 403) window.location.href = "login";
        }).then(pokemonsData => {
            setPokemons(pokemonsData);
        });
    }

    function isPokemonWished(pokemonId) {
        let isWished = likedPokemons.filter(pokemon => {
            return pokemon.id === pokemonId;
        }).length > 0;
        
        return isWished;
    }

    function isPokemonCatched(pokemonId) {
        let isCatched = catchedPokemons.filter(pokemon => {
            return pokemon.id === pokemonId;
        }).length > 0;
        
        return isCatched;
    }

    useEffect(() => {
        let decoded = jwt_decode(auth.token);
        if(decoded.sub === "admin") {
            setUserAdmin(true);
        }
        
        getPokemons();
        getCatchedPokemons();
        getLikedPokemons();

    }, []);

    return (
        <>
            <Grid container className={classes.container} spacing={2}>
                {pokemons.length !== 0 ? pokemons.map((pokemon) => (
                    <Pokemon key={pokemon.id}
                        id={pokemon.id}
                        name={pokemon.name}
                        age={pokemon.age}
                        height={pokemon.height}
                        weight={pokemon.weight}
                        type={pokemon.type}
                        gender={pokemon.gender}
                        image={pokemon.image}
                        isUserAdmin={isUserAdmin}
                        isLiked={isPokemonWished(pokemon.id)}
                        isCatched={isPokemonCatched(pokemon.id)}
                        pokemons={pokemons}
                        setPokemons={setPokemons}>
                    </Pokemon>
                )) : (
                    <Typography variant="h2" style={{ textAlign: 'center', marginTop: '20px'}}> There is not any Pokemon in Pokedex yet ! </Typography>
                )}

            </Grid>
        </>
    );
};

export default Dashboard;