// src/features/simulation/SimulationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SimulationState {
    // Champs du StepUserInfo
    name: string;
    email: string;
    phonePrefix: string;
    phoneNumber: string;
    quartier: string;

    // Sous-Sol
    hasSousSol: boolean;
    surfaceSousSol: number;
    hasPostTensionSousSol: boolean;
    hasCourAnglaise: boolean;

    // RDC
    surfaceRDC: number;
    hasPostTensionRDC: boolean;

    // Étage
    surfaceEtage: number;
    hasPostTensionEtage: boolean;

    // Piscine
    surfacePiscine: number;

    // Clôture
    hasMurCloture: boolean;
    longueurMurCloture: number;

    // Coût total
    totalCost: number | null;
}

// Exemple de prix dans le state ou stockés ailleurs
const defaultPrices = {
    terrain: 50,
    sousSol: 800,
    rdc: 900,
    etage: 900,
    piscine: 1200,
    murCloture: 400,
    postTensionRate: 400
};

const initialState: SimulationState = {
    name: "",
    email: "",
    phonePrefix: "+212",
    phoneNumber: "",
    quartier: "",

    hasSousSol: false,
    surfaceSousSol: 0,
    hasPostTensionSousSol: false,
    hasCourAnglaise: false,

    surfaceRDC: 0,
    hasPostTensionRDC: false,

    surfaceEtage: 0,
    hasPostTensionEtage: false,

    surfacePiscine: 0,

    hasMurCloture: false,
    longueurMurCloture: 0,

    totalCost: null
};

// Exemple de calcul
function computeCost(state: SimulationState) {
    let total = 0;
    // terrain (si vous l'utilisez)
    // sous-sol, rdc, etc...
    // postTensionRate...
    // ...
    // on renvoie un nombre
    return total;
}

const simulationSlice = createSlice({
    name: "simulation",
    initialState,
    reducers: {
        setField: (
            state,
            action: PayloadAction<{ field: string; value: any }>
        ) => {
            const { field, value } = action.payload;
            // Met à jour un champ
            // ex. state[field] = value;
            // Mais on doit s'assurer que field est une clé de SimulationState
            // On fait un cast (ou on utilise un type plus précis)
            (state as any)[field] = value;
        },
        computeTotalCost: (state) => {
            state.totalCost = computeCost(state);
        },
        resetTotalCost: (state) => {
            state.totalCost = null;
        }
    }
});

export const { setField, computeTotalCost, resetTotalCost } =
    simulationSlice.actions;

export default simulationSlice.reducer;