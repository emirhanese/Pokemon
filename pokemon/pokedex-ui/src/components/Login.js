import React, { useState } from "react";
import { useLocalState } from "../util/useLocalStorage"
import { Avatar, Button, Grid, Paper, TextField, Typography, Link } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useLocalState(null, "auth");

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    async function loginRequest() {

        const requestBody = {
            username: username,
            password: password,
        };

        const user = {
            username: null,
            token: null
        };

        await fetch("http://localhost:8080/api/v1/auth/authenticate", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (response.status === 200)
                    return Promise.all([response.json()]);
                else
                    return Promise.reject("Invalid login attempt!");
            })
            .then(([body]) => {
                user.username = username;
                user.token = body.token;
                setAuth(user);
                window.location.href = "dashboard";
            }).catch((message) => {
                alert(message);
            });
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' fullWidth required value={username} onChange={(event) => {setUsername(event.target.value)}}/>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required value={password} onChange={(event) => {setPassword(event.target.value)}}/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={loginRequest}>Sign in</Button>
                <Typography style={{padding: "5px"}}> You don't have an account ?
                    <Link href="/register" >
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
};

export default Login;