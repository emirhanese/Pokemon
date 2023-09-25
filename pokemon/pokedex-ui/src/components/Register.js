import React, { useState } from "react";
import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {

    const paperStyle = { padding: 25, width: 300, margin: "20px auto" }
    const headerStyle = { margin: 25 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState(-1);
    const [isCreated, setCreated] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setCreated(false);
    };

    function formOnChangeHandler() {
        console.log("form changed !!");
        setCreated(false);
    }

    function handleButton() {
        registerRequest();
        setCreated(true);
    }

    async function registerRequest() {
        const requestBody = {
            username: username,
            password: password,
            age: age
        };

        await fetch("http://localhost:8080/api/v1/auth/register", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (response.status === 201) {
                    return Promise.all([response.json()]);
                }

                else
                    return Promise.reject("User could not be created !");
            })
            .then(() => {
                window.location.href = "login";
            }).catch((message) => {
                alert(message);
            });
    }

    return (
        <div>
            <Snackbar open={isCreated} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '50%' }}>
                    User has been created successfully !
                </Alert>
            </Snackbar>
            <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}>
                            <AddCircleIcon />
                        </Avatar>
                        <h2 style={headerStyle}>Sign Up</h2>
                        <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                    </Grid>
                    <form onChange={formOnChangeHandler}>
                        <TextField fullWidth label='Username' placeholder="Enter your username" required value={username} onChange={(event) => { setUsername(event.target.value) }} />
                        <TextField type="password" fullWidth label='Password' placeholder="Enter your password" required value={password} onChange={(event) => { setPassword(event.target.value) }} />
                        <TextField fullWidth label='Age' placeholder="Enter your age" required onChange={(event) => { setAge(parseInt(event.target.value)) }} />
                        <Button type='submit' variant='contained' color='primary' onClick={handleButton}>Sign up</Button>
                    </form>
                </Paper>
            </Grid>
        </div>
    );
};

export default Register;