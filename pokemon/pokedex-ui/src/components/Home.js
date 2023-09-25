import { Typography } from "@mui/material";

const Home = () => {

    return (
        <div style={{ textAlign: 'center', padding: 20, alignItems: 'center' }}>
            <Typography variant="h2" color="primary"> Welcome to Pokedex ! </Typography>
            <div className="background">
                <img src={process.env.PUBLIC_URL + '/background.jpg'} alt="Pokemon Background"></img>
            </div>
        </div>
    );
};

export default Home;