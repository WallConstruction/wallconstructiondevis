// src/pages/WizardPage/steps/StepEtage.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
import { Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";

function StepEtage() {
    const { register } = useFormContext();

    return (
        <div>
            <Typography variant="h5">Étage</Typography>

            <TextField
                label="Surface de l'Étage (m²)"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("surfaceEtage", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Doit être >= 0" },
                })}
            />

            <FormControlLabel
                control={<Checkbox {...register("hasPostTensionEtage")} />}
                label="Post-Tension"
            />
        </div>
    );
}

export default StepEtage;