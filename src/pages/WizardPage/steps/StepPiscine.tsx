// src/pages/WizardPage/steps/StepPiscine.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
import { TextField, Typography } from "@mui/material";

function StepPiscine() {
    const { register } = useFormContext();

    return (
        <div>
            <Typography variant="h5">Piscine</Typography>

            <TextField
                label="Surface de la Piscine (m²)"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("surfacePiscine", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Doit être >= 0" },
                })}
            />
        </div>
    );
}

export default StepPiscine;