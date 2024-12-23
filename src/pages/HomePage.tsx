// src/pages/HomePage.tsx
import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <Container>
            <Typography variant="h4" sx={{ mt: 2 }}>
                Accueil
            </Typography>
            <Typography>
                Bienvenue sur la plateforme de simulation de coût.
            </Typography>
            <Button variant="contained" component={Link} to="/wizard" sx={{ mt: 2 }}>
                Lancer la Simulation
            </Button>
        </Container>
    );
}

export default HomePage;