import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WizardPage from "./pages/WizardPage/WizardPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// Exemple : background noir, texte blanc
const darkTheme = createTheme({
    palette: {
        mode: "dark" // <-- Le plus important
        // MUI va alors appliquer des couleurs adaptées (typo, surfaces, etc.)
    }
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<WizardPage />} />
                    {/* Ajoutez vos autres pages/routes ici */}
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;