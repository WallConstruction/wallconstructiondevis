// src/pages/SimulationPage.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { calculateConstructionCost } from "../components/costCalculator";

// Les sous-composants :
import UserInfoForm from "../components/forms/UserInfoForm";
import SousSolForm from "../components/forms/SousSolForm";
import RDCForm from "../components/forms/RDCForm";
import EtageForm from "../components/forms/EtageForm";
import PiscineForm from "../components/forms/PiscineForm";
import ClotureForm from "../components/forms/ClotureForm";

// Exemple de prix passés en dur (vous pourriez les passer en props, ou venir d'une API)
const defaultPrices = {
    terrain: 50,        // ex: 50 MAD/m²
    sousSol: 800,       // ex: 800 MAD/m²
    rdc: 900,           // ex: 900 MAD/m²
    etage: 900,         // ex: 900 MAD/m²
    piscine: 1200,      // ex: 1200 MAD/m²
    murCloture: 400,    // ex: 400 MAD/m
};

const SimulationPage: React.FC = () => {
    const [totalCost, setTotalCost] = useState<number | null>(null);

    // Initialise React Hook Form :
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange", // valide en temps réel
        defaultValues: {
            phonePrefix: "+212",
            sector: "Marrakech Agdal",
            prices: defaultPrices, // on stocke les prix dans le form si besoin
            // les autres champs par défaut à false ou null
            hasSousSol: false,
            hasPostTensionSousSol: false,
            hasCourAnglaise: false,
            hasPostTensionRDC: false,
            hasPostTensionEtage: false,
            hasMurCloture: false,
        },
    });

    // La fonction callback du formulaire
    const onSubmit = (data: any) => {
        // Regroupez toutes les valeurs pertinentes pour le calcul
        const calcData = {
            surfaceTerrain: data.surfaceTerrain,
            surfaceSousSol: data.surfaceSousSol,
            hasCourAnglaise: data.hasCourAnglaise,
            hasPostTensionSousSol: data.hasPostTensionSousSol,
            surfaceRDC: data.surfaceRDC,
            hasPostTensionRDC: data.hasPostTensionRDC,
            surfaceEtage: data.surfaceEtage,
            hasPostTensionEtage: data.hasPostTensionEtage,
            surfacePiscine: data.surfacePiscine,
            hasMurCloture: data.hasMurCloture,
            longueurMurCloture: data.longueurMurCloture,
            prices: defaultPrices, // ou data.prices si vous voulez un champ dynamique
        };

        const cost = calculateConstructionCost(calcData);
        setTotalCost(cost);
    };

    return (
        <div style={{ width: "600px", margin: "auto", padding: "1rem" }}>
            <h1>Simulation de Coût de Construction</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* 1) Infos Utilisateur */}
                <UserInfoForm register={register} errors={errors} />

                {/* 2) Sous-Sol */}
                <SousSolForm register={register} watch={watch} errors={errors} />

                {/* 3) RDC */}
                <RDCForm register={register} />

                {/* 4) 1er Étage */}
                <EtageForm register={register} />

                {/* 5) Piscine */}
                <PiscineForm register={register} />

                {/* 6) Mur de Clôture */}
                <ClotureForm register={register} watch={watch} />

                {/* Bouton de Calcul */}
                <button type="submit" disabled={!isValid} style={{ marginTop: "1rem" }}>
                    Calculer
                </button>
            </form>

            {totalCost !== null && (
                <p style={{ marginTop: "2rem", fontWeight: "bold" }}>
                    Coût Total Estimé : {totalCost.toFixed(2)} MAD
                </p>
            )}
        </div>
    );
};

export default SimulationPage;