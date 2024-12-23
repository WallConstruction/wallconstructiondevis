// src/tests/costCalculator.test.ts
import { calculateConstructionCost } from "../services/costCalculator";

describe("calculateConstructionCost", () => {
    it("calcule un coût simple", () => {
        const data = {
            surfaceTerrain: 100,
            surfaceSousSol: 50,
            hasCourAnglaise: false,
            hasPostTensionSousSol: false,
            prices: {
                terrain: 50,
                sousSol: 800,
                rdc: 900,
                etage: 900,
                piscine: 1200,
                murCloture: 400
            }
        };

        const result = calculateConstructionCost(data);
        // Terrain: 100 * 50 = 5000
        // SousSol: 50 * 800 = 40000
        // Total 45000
        expect(result).toBe(45000);
    });

    it("prend en compte la cour anglaise", () => {
        const data = {
            surfaceSousSol: 50,
            hasCourAnglaise: true,
            prices: {
                terrain: 50,
                sousSol: 800,
                rdc: 900,
                etage: 900,
                piscine: 1200,
                murCloture: 400
            }
        };
        // SousSol: 50 * 800 = 40000
        // Cour Anglaise => +30% => 40000 * 1.3 = 52000
        expect(calculateConstructionCost(data)).toBe(52000);
    });
});