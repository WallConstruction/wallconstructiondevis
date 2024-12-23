// src/services/costCalculator.ts

export interface PriceConfig {
    terrain: number;
    sousSol: number;
    rdc: number;
    etage: number;
    piscine: number;
    murCloture: number;
    // etc.
}

export interface SimulationData {
    surfaceTerrain?: number;
    surfaceSousSol?: number;
    hasCourAnglaise?: boolean;
    hasPostTensionSousSol?: boolean;
    surfaceRDC?: number;
    hasPostTensionRDC?: boolean;
    // etc.
    prices: PriceConfig;
}

/** Exemple de fonction de calcul de coût */
export function calculateConstructionCost(data: SimulationData): number {
    let totalCost = 0;

    if (data.surfaceTerrain) {
        totalCost += data.surfaceTerrain * data.prices.terrain;
    }
    if (data.surfaceSousSol) {
        let sousSolCost = data.surfaceSousSol * data.prices.sousSol;
        if (data.hasPostTensionSousSol) sousSolCost += data.surfaceSousSol * 400;
        if (data.hasCourAnglaise) sousSolCost *= 1.3;
        totalCost += sousSolCost;
    }
    // etc. pour RDC, étages, piscine, murCloture

    return totalCost;
}