import React, { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import {
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
    Tooltip
} from "@mui/material";

function StepSousSol() {
    const { register, watch, setValue } = useFormContext();

    const hasSousSol = watch("hasSousSol");
    const surfaceSousSol = watch("surfaceSousSol");
    const hasCourAnglaise = watch("hasCourAnglaise");

    // Détection (true -> false) pour reset
    const prevHasSousSol = useRef<boolean>(false);
    useEffect(() => {
        if (prevHasSousSol.current === true && !hasSousSol) {
            setValue("surfaceSousSol", 0);
            setValue("hasCourAnglaise", false);
            setValue("hasPostTensionSousSol", false);
        }
        prevHasSousSol.current = !!hasSousSol;
    }, [hasSousSol, setValue]);

    const depth = 4;
    const effectiveSurface = (surfaceSousSol || 0) * (hasCourAnglaise ? 1.3 : 1);
    const volumeSousSol = effectiveSurface * depth;

    return (
        <div>
            <Typography variant="h5">Sous-Sol</Typography>

            {/* Checkbox Sous-Sol */}
            <FormControlLabel
                control={<Checkbox {...register("hasSousSol")} />}
                label="Ajouter un Sous-Sol ?"
            />

            {hasSousSol && (
                <div style={{ marginLeft: "1rem" }}>
                    {/* Surface du Sous-Sol */}
                    <TextField
                        label="Surface du Sous-Sol (m²)"
                        type="number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...register("surfaceSousSol", {
                            valueAsNumber: true,
                            min: { value: 0, message: "Doit être >= 0" }
                        })}
                    />

                    {/* Post-Tension avec bulle explicative */}
                    <FormControlLabel
                        control={<Checkbox {...register("hasPostTensionSousSol")} />}
                        label={
                            <Tooltip title="La post-tension est une technique de renforcement des dalles,
                utilisée souvent pour réduire l’épaisseur des planchers et améliorer leur résistance.">
                                <span>Post-Tension ?</span>
                            </Tooltip>
                        }
                    />

                    {/* Cour Anglaise */}
                    <FormControlLabel
                        control={<Checkbox {...register("hasCourAnglaise")} />}
                        label="Cour Anglaise ?"
                    />

                    {/* Volume calculé, on évite NaN */}
                    {surfaceSousSol > 0 && (
                        <Typography sx={{ mt: 2 }}>
                            Volume théorique : {volumeSousSol.toFixed(2)} m³
                        </Typography>
                    )}
                </div>
            )}
        </div>
    );
}

export default StepSousSol;