import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useLocalState } from '../util/useLocalStorage';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddPokemon = () => {
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" };
    const headerStyle = { margin: 0 };
    const avatarStyle = { backgroundColor: '#1bbd7e', marginBottom: '10px' };
    const marginTop = { marginTop: 15 };

    const [auth, setAuth] = useLocalState(null, "auth");
    const [name, setName] = useState("");
    const [age, setAge] = useState(-1);
    const [gender, setGender] = useState("");
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [isCreated, setCreated] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setCreated(false);
    };

    const handleSubmit = (event) => {
        createPokemon();
        setCreated(true);
    }

    async function createPokemon() {

        const pokemon = {
            name: name,
            age: age,
            gender: gender,
            height: height,
            weight: weight,
            type: type,
            image: image
        };

        await fetch("http://localhost:8080/api/v1/pokemons", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            method: "POST",
            body: JSON.stringify(pokemon),
        })
            .then((response) => {
                if (response.status === 201) {
                    return Promise.all([response.json()]);
                }

                else
                    return Promise.reject("Pokemon could not be created !");
            })
            .then(([body]) => {
                window.location.href = "dashboard";
            }).catch((message) => {
                alert(message);
            });
    }

    function formOnChangeHandler() {
        setCreated(false);
    }

    return (
        <div>
            <Snackbar open={isCreated} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Pokemon has been created successfully !
                </Alert>
            </Snackbar>
            <Grid spacing={4}>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}>
                            <AddIcon fontSize='medium' />
                        </Avatar>
                        <h2 style={headerStyle}>Add Pokemon</h2>
                    </Grid>
                    <form onChange={formOnChangeHandler}>
                        <TextField fullWidth label='Name' placeholder="Pokemon name" value={name} onChange={(event) => { setName(event.target.value) }} />
                        <TextField fullWidth label='Age' placeholder="Pokemon age" onChange={(event) => { setAge(parseInt(event.target.value)) }} />
                        <FormControl component="fieldset" style={marginTop}>
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }} value={gender} onChange={(event) => { setGender(event.target.value) }}>
                                <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                                <FormControlLabel value="MALE" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                        <TextField fullWidth label='Height' placeholder="Pokemon height" onChange={(event) => { setHeight(parseFloat(event.target.value)) }} />
                        <TextField fullWidth label='Weight' placeholder="Pokemon weight" onChange={(event) => { setWeight(parseFloat(event.target.value)) }} />
                        <TextField fullWidth label='Type' placeholder="Pokemon type" onChange={(event) => { setType(event.target.value) }} />
                        <TextField fullWidth label='Image URL' placeholder="Pokemon image URL" value={image} onChange={(event) => { setImage(event.target.value) }} />
                        <Button type='submit' variant='contained' color='primary' style={{ marginTop: '25px', padding: '8px' }} endIcon={<CatchingPokemonIcon />} onClick={handleSubmit}> Pokedex </Button>
                    </form>
                </Paper>
            </Grid>
        </div>
    )
}

export default AddPokemon;