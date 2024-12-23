// src/pages/WizardPage/steps/StepRDC.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
import { Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";

function StepRDC() {
    const { register } = useFormContext();

    return (
        <div>
            <Typography variant="h5">RDC</Typography>

            <TextField
                label="Surface du RDC (m²)"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("surfaceRDC", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Doit être >= 0" },
                })}
            />

            <FormControlLabel
                control={<Checkbox {...register("hasPostTensionRDC")} />}
                label="Post-Tension"
            />
        </div>
    );
}

export default StepRDC;