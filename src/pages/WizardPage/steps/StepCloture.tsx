// src/pages/WizardPage/steps/StepCloture.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
import { Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";

function StepCloture() {
    const { register, watch } = useFormContext();
    const hasMurCloture = watch("hasMurCloture");

    return (
        <div>
            <Typography variant="h5">Clôture</Typography>

            <FormControlLabel
                control={<Checkbox {...register("hasMurCloture")} />}
                label="Mur de Clôture ?"
            />

            {hasMurCloture && (
                <TextField
                    label="Longueur du Mur (m)"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register("longueurMurCloture", {
                        valueAsNumber: true,
                        min: { value: 0, message: "Doit être >= 0" },
                    })}
                />
            )}
        </div>
    );
}

export default StepCloture;