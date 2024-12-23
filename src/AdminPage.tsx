import React, { useState } from "react";

const AdminPage: React.FC<{ prices: any; onUpdatePrices: (newPrices: any) => void }> = ({
                                                                                            prices,
                                                                                            onUpdatePrices,
                                                                                        }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        const adminUsername = "Wallconstruction"; // Nom d'utilisateur requis
        const adminPassword = "7fwsiqrn"; // Mot de passe requis

        if (username === adminUsername && password === adminPassword) {
            setIsAuthenticated(true);
        } else {
            alert("Nom d'utilisateur ou mot de passe incorrect.");
        }
    };

    const handlePriceChange = (field: string, value: string) => {
        const updatedPrices = { ...prices, [field]: parseFloat(value) };
        onUpdatePrices(updatedPrices);
    };

    const handleSave = () => {
        alert("Les prix ont été mis à jour avec succès !");
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-login-container">
                <h1>Accès Administrateur</h1>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Se connecter</button>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <h1>Page Administrateur</h1>
            <div className="price-form">
                {Object.keys(prices).map((key) => (
                    <div key={key} className="price-item">
                        <label>{key} (MAD/m² ou unité) :</label>
                        <input
                            type="number"
                            value={prices[key]}
                            onChange={(e) => handlePriceChange(key, e.target.value)}
                        />
                    </div>
                ))}
                <button className="save-button" onClick={handleSave}>
                    Sauvegarder les prix
                </button>
            </div>
        </div>
    );
};

export default AdminPage;
