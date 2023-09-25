import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useLocalState } from "../util/useLocalStorage";
import { Link } from "react-router-dom";
import makeStyles from '@mui/styles/makeStyles';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import Person2Icon from '@mui/icons-material/Person2';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { ListItemIcon, ListItemText } from "@mui/material";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 2,
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: "none",
        boxShadow: "none",
        color: "white"
    }
}));

const Navbar = () => {

    const nullUser = {
        username: null,
        token: null
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [auth, setAuth] = useLocalState(nullUser, "auth");
    const open = Boolean(anchorEl2);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenu2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const handleButton = (event) => {
        if (event.currentTarget.innerText === "Login") {
            console.log("Login!!!");
            window.location.href = "/login";
        }

        else if (event.currentTarget.innerText === "Register") {
            window.location.href = "/register";
        }

        else if (event.currentTarget.innerText === "Profile") {
            window.location.href = "/profile";
        }

        else if (event.currentTarget.innerText === "Add Pokemon") {
            window.location.href = "addPokemon";
        }

        else if (event.currentTarget.innerText === "Wishlist") {
            console.log("Wishlist !!");
        }

        else if (event.currentTarget.innerText === "Catched Pokemons") {
            console.log("Catched Pokemons !!");
        }

        else if (event.currentTarget.innerText === "Exit") {
            setAuth(nullUser);
            window.location.href = "/";
        }
    };

    const classes = useStyles();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{position: 'sticky'}}>
                <Toolbar>
                    <IconButton
                        id="basic-button"
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleMenu2}
                    >
                        <MenuIcon />
                    </IconButton>
                    {auth.token && window.location.href.endsWith("dashboard") && (
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl2}
                            open={open}
                            onClose={handleClose2}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleButton}>
                                <ListItemIcon>
                                    <CatchingPokemonIcon fontSize="medium" />
                                </ListItemIcon>
                                <ListItemText>Add Pokemon</ListItemText>
                            </MenuItem>
                        </Menu>
                    )}
                    {auth.token && window.location.href.endsWith("profile") && (
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl2}
                            open={open}
                            onClose={handleClose2}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleButton}>
                                <ListItemIcon>
                                    <FavoriteIcon fontSize="medium" />
                                </ListItemIcon>
                                <ListItemText>Wishlist</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleButton}>
                                <ListItemIcon>
                                    <CatchingPokemonIcon fontSize="medium" />
                                </ListItemIcon>
                                <ListItemText>Catched Pokemons</ListItemText>
                            </MenuItem>
                        </Menu>
                    )}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link className={classes.link} to={"/dashboard"}> Dashboard </Link>
                    </Typography>
                    {auth.token && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleButton}>
                                    <ListItemIcon>
                                        <Person2Icon fontSize="medium" />
                                    </ListItemIcon>
                                    <ListItemText>Profile</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={handleButton}>
                                    <ListItemIcon>
                                        <LogoutIcon fontSize="medium" />
                                    </ListItemIcon>
                                    <ListItemText>Exit</ListItemText>
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                    {!auth.token && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleButton}>
                                    <ListItemIcon>
                                        <LoginIcon fontSize="medium" />
                                    </ListItemIcon>
                                    <ListItemText>Login</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={handleButton}>
                                    <ListItemIcon>
                                        <AddIcon fontSize="medium" />
                                    </ListItemIcon>
                                    <ListItemText>Register</ListItemText>
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;