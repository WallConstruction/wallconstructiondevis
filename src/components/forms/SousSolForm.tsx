// src/components/forms/SousSolForm.tsx
import React from "react";
import { UseFormRegister, FieldErrorsImpl, UseFormWatch } from "react-hook-form";

interface SousSolFormProps {
    register: UseFormRegister<any>;
    watch: UseFormWatch<any>;
    errors: FieldErrorsImpl<any>;
}

const SousSolForm: React.FC<SousSolFormProps> = ({ register, watch, errors }) => {
    const hasSousSol = watch("hasSousSol");
    const surfaceSousSol = watch("surfaceSousSol");
    const hasCourAnglaise = watch("hasCourAnglaise");

    // Calcul du volume :
    // (Exemple : profondeur fixe = 4)
    const depth = 4;
    let volumeSousSol = 0;
    if (surfaceSousSol) {
        let adjustedSurface = surfaceSousSol * 1.1; // +10% d'espace
        if (hasCourAnglaise) {
            adjustedSurface *= 1.3; // +30% pour la cour anglaise
        }
        volumeSousSol = adjustedSurface * depth;
    }

    return (
        <div style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}>
            <h2>Sous-Sol</h2>

            <label>
                <input type="checkbox" {...register("hasSousSol")} />
                &nbsp;Sous-Sol ?
            </label>

            {hasSousSol && (
                <div style={{ marginLeft: "1rem" }}>
                    <label>Surface du Sous-Sol (m²) : </label>
                    <input
                        type="number"
                        {...register("surfaceSousSol", {
                            valueAsNumber: true,
                            min: {
                                value: 1,
                                message: "Surface sous-sol doit être > 0",
                            },
                        })}
                    />
                    {errors.surfaceSousSol && (
                        <p style={{ color: "red" }}>{errors.surfaceSousSol.message}</p>
                    )}

                    {surfaceSousSol && (
                        <p style={{ marginTop: "10px" }}>
                            Volume du Sous-Sol : <b>{volumeSousSol.toFixed(2)}</b> m³
                        </p>
                    )}

                    <br />

                    <label>
                        <input type="checkbox" {...register("hasPostTensionSousSol")} />
                        &nbsp;Post-Tension ?
                    </label>

                    <br />

                    <label>
                        <input type="checkbox" {...register("hasCourAnglaise")} />
                        &nbsp;Cour Anglaise ?
                    </label>
                </div>
            )}
        </div>
    );
};

export default SousSolForm;