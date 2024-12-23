// src/components/forms/UserInfoForm.tsx
import React from "react";
import { UseFormRegister, FieldErrorsImpl } from "react-hook-form";

interface UserInfoFormProps {
    register: UseFormRegister<any>;
    errors: FieldErrorsImpl<any>;
}

const phonePrefixes = [
    { code: "+212", label: "Maroc" },
    { code: "+33", label: "France" },
    { code: "+1", label: "USA" },
    { code: "+44", label: "UK" },
    { code: "+49", label: "Allemagne" },
    { code: "+34", label: "Espagne" },
    { code: "+39", label: "Italie" },
];

const sectors = [
    "Marrakech Agdal",
    "Marrakech Ville",
    "Route d'Amizmiz",
    "Route de Tahanout",
    "Route de l'Ourika",
    "Route de Fes",
    "Route de Ouarzazate",
];

const UserInfoForm: React.FC<UserInfoFormProps> = ({ register, errors }) => {
    return (
        <div style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}>
            <h2>Informations Générales</h2>

            <label>Nom et Prénom : </label>
            <input
                type="text"
                {...register("name", { required: "Le nom est requis" })}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

            <br />

            <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
                <label style={{ marginRight: "0.5rem" }}>Téléphone : </label>
                <select {...register("phonePrefix")}>
                    {phonePrefixes.map((prefix) => (
                        <option key={prefix.code} value={prefix.code}>
                            {prefix.label} ({prefix.code})
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    style={{ marginLeft: "0.5rem" }}
                    {...register("phoneNumber", { required: "Le téléphone est requis" })}
                />
            </div>
            {errors.phoneNumber && (
                <p style={{ color: "red" }}>{errors.phoneNumber.message}</p>
            )}

            <br />

            <label>Adresse Email : </label>
            <input
                type="email"
                {...register("email", {
                    required: "L'email est requis",
                    pattern: {
                        value: /^[^@]+@[^@]+\.[^@]+$/,
                        message: "Format d'email invalide",
                    },
                })}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

            <br />

            <label>Secteur : </label>
            <select {...register("sector", { required: true })}>
                {sectors.map((sec) => (
                    <option key={sec} value={sec}>
                        {sec}
                    </option>
                ))}
            </select>
            {errors.sector && <p style={{ color: "red" }}>Secteur requis</p>}

            <br />

            <label>Surface du Terrain (m²) : </label>
            <input
                type="number"
                {...register("surfaceTerrain", {
                    required: "Surface du terrain requise",
                    valueAsNumber: true,
                    min: {
                        value: 1,
                        message: "La surface doit être positive",
                    },
                })}
            />
            {errors.surfaceTerrain && (
                <p style={{ color: "red" }}>{errors.surfaceTerrain.message}</p>
            )}
        </div>
    );
};

export default UserInfoForm;