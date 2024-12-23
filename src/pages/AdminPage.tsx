// src/pages/AdminPage.tsx
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updatePrices } from "../features/simulation/SimulationSlice";
import { Button, TextField, Typography } from "@mui/material";

function AdminPage() {
    const dispatch = useAppDispatch();
    const prices = useAppSelector((state) => state.simulation.prices);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Temporaire : c'est un login ultra basique
    const handleLogin = () => {
        if (username === "Admin" && password === "Password") {
            setIsLoggedIn(true);
        } else {
            alert("Identifiants invalides");
        }
    };

    const [terrain, setTerrain] = useState(prices.terrain);
    const [sousSol, setSousSol] = useState(prices.sousSol);
    const [rdc, setRdc] = useState(prices.rdc);
    const [etage, setEtage] = useState(prices.etage);
    const [piscine, setPiscine] = useState(prices.piscine);
    const [murCloture, setMurCloture] = useState(prices.murCloture);
    const [postTensionRate, setPostTensionRate] = useState(prices.postTensionRate);

    const handleSave = () => {
        dispatch(
            updatePrices({
                terrain,
                sousSol,
                rdc,
                etage,
                piscine,
                murCloture,
                postTensionRate
            })
        );
        alert("Nouveaux prix sauvegardés");
    };

    if (!isLoggedIn) {
        return (
            <div style={{ margin: "2rem" }}>
                <Typography variant="h4" gutterBottom>Connexion Admin</Typography>
                <TextField
                    label="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    fullWidth
                />
                <Button variant="contained" onClick={handleLogin}>Se connecter</Button>
            </div>
        );
    }

    return (
        <div style={{ margin: "2rem" }}>
            <Typography variant="h4" gutterBottom>Page Admin - Modifier les prix</Typography>

            <TextField
                label="Prix Terrain (MAD/m²)"
                type="number"
                value={terrain}
                onChange={(e) => setTerrain(Number(e.target.value))}
                margin="normal"
                fullWidth
            />
            <TextField
                label="Prix Sous-Sol (MAD/m²)"
                type="number"
                value={sousSol}
                onChange={(e) => setSousSol(Number(e.target.value))}
                margin="normal"
                fullWidth
            />
            <TextField
                label="Prix RDC (MAD/m²)"
                type="number"
                value={rdc}
                onChange={(e) => setRdc(Number(e.target.value))}
                margin="normal"
                fullWidth
            />
            <TextField
                label="Prix Étage (MAD/m²)"
                type="number"
                value={etage}
                onChange={(e) => setEtage(Number(e.target.value))}
                margin="normal"
                fullWidth
            />
            <TextField
                label="Prix Piscine (MAD/m²)"
                type="number"
                value={piscine}
                onChange={(e) => setPiscine(Number(e.target.value))}
                margin="normal"
                fullWidth
            />
            <TextField
                label="Prix Mur Clôture (MAD/m)"
                type="number"
                value={murCloture}
                onChange={(e) => setMurCloture(Number(e.target.value))}
                margin="normal"
                fullWidth
            />
            <TextField
                label="Coût Post-Tension (MAD/m²)"
                type="number"
                value={postTensionRate}
                onChange={(e) => setPostTensionRate(Number(e.target.value))}
                margin="normal"
                fullWidth
            />

            <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
                Sauvegarder
            </Button>
        </div>
    );
}

export default AdminPage;