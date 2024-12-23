// src/pages/WizardPage/steps/StepUserInfo.tsx

import React from "react";
import { useFormContext } from "react-hook-form";
import {
    TextField,
    Typography,
    MenuItem,
    Grid
} from "@mui/material";

function StepUserInfo() {
    const {
        register,
        formState: { errors }
    } = useFormContext();

    // Préfixes téléphoniques possibles
    const phonePrefixes = [
        { label: "Maroc (+212)", value: "+212" },
        { label: "France (+33)", value: "+33" },
        { label: "UK (+44)",    value: "+44" }
        // Ajoutez-en si besoin...
    ];

    // Liste (exemple) de quartiers/secteurs
    const quartiers = [
        "Marrakech",
        "Agdal",
        "Route d'Amizmiz",
        "Route d'Ourika",
        "Route Tahanout",
        "Route d'Agadir",
        "Route de Fes"
        // À personnaliser selon votre ville
    ];

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Informations Utilisateur
            </Typography>

            {/* Nom complet */}
            <TextField
                label="Nom / Prenom"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("name", { required: "Le nom est requis" })}
                error={!!errors.name}
                helperText={errors.name && errors.name.message?.toString()}
            />

            {/* Email */}
            <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("email", {
                    required: "L'email est requis",
                    pattern: {
                        value: /^[^@]+@[^@]+\.[^@]+$/,
                        message: "Format d'email invalide"
                    }
                })}
                error={!!errors.email}
                helperText={errors.email && errors.email.message?.toString()}
            />

            {/* Préfixe + Téléphone */}
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                    <TextField
                        select
                        label="Préfixe"
                        fullWidth
                        margin="normal"
                        defaultValue="+212" // Préfixe par défaut
                        {...register("phonePrefix", { required: "Le préfixe est requis" })}
                        error={!!errors.phonePrefix}
                        helperText={errors.phonePrefix && errors.phonePrefix.message?.toString()}
                    >
                        {phonePrefixes.map((pref) => (
                            <MenuItem key={pref.value} value={pref.value}>
                                {pref.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        label="Téléphone"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...register("phoneNumber", {
                            required: "Le téléphone est requis",
                            pattern: {
                                value: /^\d+$/,
                                message: "Le numéro doit contenir uniquement des chiffres"
                            },
                            minLength: {
                                value: 9,
                                message: "Le numéro doit comporter au moins 9 chiffres"
                            }
                        })}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber && errors.phoneNumber.message?.toString()}
                    />
                </Grid>
            </Grid>

            {/* Sélection du quartier */}
            <TextField
                select
                label="Quartier"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("quartier", {
                    required: "Veuillez choisir un quartier"
                })}
                error={!!errors.quartier}
                helperText={errors.quartier && errors.quartier.message?.toString()}
            >
                {quartiers.map((q) => (
                    <MenuItem key={q} value={q}>
                        {q}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    );
}

export default StepUserInfo;