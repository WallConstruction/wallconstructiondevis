
import React, { useState, useEffect } from "react";
import "./simulation_page_styles.css";

const phonePrefixes = [
    { code: "+212", label: "Maroc" },
    { code: "+33", label: "France" },
    { code: "+1", label: "USA" },
    { code: "+44", label: "UK" },
    { code: "+49", label: "Allemagne" },
    { code: "+34", label: "Espagne" },
    { code: "+39", label: "Italie" },
];

const SimulationPage: React.FC<{ prices: any }> = ({ prices }) => {
    const [name, setName] = useState<string>("");
    const [phonePrefix, setPhonePrefix] = useState<string>("+212");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [sector, setSector] = useState<string>("Marrakech Agdal");
    const [surfaceTerrain, setSurfaceTerrain] = useState<number | null>(null);
    const [hasSousSol, setHasSousSol] = useState<boolean>(false);
    const [surfaceSousSol, setSurfaceSousSol] = useState<number | null>(null);
    const [hasPostTensionSousSol, setHasPostTensionSousSol] = useState<boolean>(false);
    const [hasCourAnglaise, setHasCourAnglaise] = useState<boolean>(false);
    const [volumeSousSol, setVolumeSousSol] = useState<number | null>(null);
    const [surfaceRDC, setSurfaceRDC] = useState<number | null>(null);
    const [hasPostTensionRDC, setHasPostTensionRDC] = useState<boolean>(false);
    const [surfaceEtage, setSurfaceEtage] = useState<number | null>(null);
    const [hasPostTensionEtage, setHasPostTensionEtage] = useState<boolean>(false);
    const [surfacePiscine, setSurfacePiscine] = useState<number | null>(null);
    const [hasMurCloture, setHasMurCloture] = useState<boolean>(false);
    const [longueurMurCloture, setLongueurMurCloture] = useState<number | null>(null);
    const [cost, setCost] = useState<number | null>(null);

    useEffect(() => {
        if (surfaceSousSol) {
            const depth = 4; // Fixed depth for Sous-Sol
            let adjustedSurface = surfaceSousSol * 1.1; // 10% extra for space
            if (hasCourAnglaise) adjustedSurface *= 1.3; // 30% extra for Cour Anglaise
            setVolumeSousSol(adjustedSurface * depth); // Calculate total volume
        } else {
            setVolumeSousSol(null);
        }
    }, [surfaceSousSol, hasCourAnglaise]);

    const calculateCost = () => {
        if (!name || !phoneNumber || !email || !surfaceRDC) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        let totalCost = 0;
        if (surfaceTerrain) totalCost += surfaceTerrain * prices.terrain;

        if (surfaceSousSol) {
            let sousSolCost = surfaceSousSol * prices.sousSol;
            if (hasPostTensionSousSol) sousSolCost += surfaceSousSol * 400;
            if (hasCourAnglaise) sousSolCost *= 1.3;
            totalCost += sousSolCost;
        }

        if (surfaceRDC) {
            let rdcCost = surfaceRDC * prices.rdc;
            if (hasPostTensionRDC) rdcCost += surfaceRDC * 400;
            totalCost += rdcCost;
        }

        if (surfaceEtage) {
            let etageCost = surfaceEtage * prices.etage;
            if (hasPostTensionEtage) etageCost += surfaceEtage * 400;
            totalCost += etageCost;
        }

        if (surfacePiscine) totalCost += surfacePiscine * prices.piscine;
        if (hasMurCloture && longueurMurCloture) totalCost += longueurMurCloture * prices.murCloture;

        setCost(totalCost);
    };

    return (
        <div className="container">
            <h1>Simulation de Coût de Construction</h1>
            <label>
                Nom et Prénom :
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <div className="phone-input">
                <select
                    className="phone-prefix"
                    value={phonePrefix}
                    onChange={(e) => setPhonePrefix(e.target.value)}
                >
                    {phonePrefixes.map((prefix) => (
                        <option key={prefix.code} value={prefix.code}>
                            {prefix.label} ({prefix.code})
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    className="phone-number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>
            <label>
                Adresse Email :
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Secteur :
                <select value={sector} onChange={(e) => setSector(e.target.value)}>
                    <option>Marrakech Agdal</option>
                    <option>Marrakech Ville</option>
                    <option>Route d'Amizmiz</option>
                    <option>Route de Tahanout</option>
                    <option>Route de l'Ourika</option>
                    <option>Route de Fes</option>
                    <option>Route de Ouarzazate</option>
                </select>
            </label>
            <label>
                Surface du Terrain (m²) :
                <input
                    type="number"
                    value={surfaceTerrain || ""}
                    onChange={(e) => setSurfaceTerrain(Number(e.target.value))}
                />
            </label>
            <button
                className={`toggle-button ${hasSousSol ? "active" : ""}`}
                onClick={() => setHasSousSol(!hasSousSol)}
            >
                Sous-Sol
            </button>
            {hasSousSol && (
                <>
                    <label>
                        Surface du Sous-Sol (m²) :
                        <input
                            type="number"
                            value={surfaceSousSol || ""}
                            onChange={(e) => setSurfaceSousSol(Number(e.target.value))}
                        />
                    </label>
                    {volumeSousSol !== null && (
                        <p style={{ marginTop: "10px", color: "#ffffff" }}>
                            Volume du Sous-Sol : {volumeSousSol.toFixed(2)} m³
                        </p>
                    )}
                    <button
                        className={`toggle-button ${hasPostTensionSousSol ? "active" : ""}`}
                        onClick={() => setHasPostTensionSousSol(!hasPostTensionSousSol)}
                    >
                        Post-Tension
                    </button>
                    <button
                        className={`toggle-button ${hasCourAnglaise ? "active" : ""}`}
                        onClick={() => setHasCourAnglaise(!hasCourAnglaise)}
                    >
                        Cour Anglaise
                    </button>
                </>
            )}
            <label>
                Surface du RDC (m²) :
                <input
                    type="number"
                    value={surfaceRDC || ""}
                    onChange={(e) => setSurfaceRDC(Number(e.target.value))}
                />
            </label>
            <button
                className={`toggle-button ${hasPostTensionRDC ? "active" : ""}`}
                onClick={() => setHasPostTensionRDC(!hasPostTensionRDC)}
            >
                Post-Tension
            </button>
            <label>
                Surface du 1er Étage (m²) :
                <input
                    type="number"
                    value={surfaceEtage || ""}
                    onChange={(e) => setSurfaceEtage(Number(e.target.value))}
                />
            </label>
            <button
                className={`toggle-button ${hasPostTensionEtage ? "active" : ""}`}
                onClick={() => setHasPostTensionEtage(!hasPostTensionEtage)}
            >
                Post-Tension
            </button>
            <label>
                Surface de la Piscine (m²) :
                <input
                    type="number"
                    value={surfacePiscine || ""}
                    onChange={(e) => setSurfacePiscine(Number(e.target.value))}
                />
            </label>
            <button
                className={`toggle-button ${hasMurCloture ? "active" : ""}`}
                onClick={() => setHasMurCloture(!hasMurCloture)}
            >
                Mur de Clôture
            </button>
            {hasMurCloture && (
                <label>
                    Longueur du Mur de Clôture (m) :
                    <input
                        type="number"
                        value={longueurMurCloture || ""}
                        onChange={(e) => setLongueurMurCloture(Number(e.target.value))}
                    />
                </label>
            )}
            <button className="calculate-button" onClick={calculateCost}>
                Calculer
            </button>
            {cost !== null && (
                <p>Coût Total Estimé : {cost.toFixed(2)} MAD</p>
            )}
        </div>
    );
};

export default SimulationPage;
