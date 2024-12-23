// src/components/forms/PiscineForm.tsx
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface PiscineFormProps {
    register: UseFormRegister<any>;
}

const PiscineForm: React.FC<PiscineFormProps> = ({ register }) => {
    return (
        <div style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}>
            <h2>Piscine</h2>
            <label>Surface de la Piscine (m²) : </label>
            <input
                type="number"
                {...register("surfacePiscine", { valueAsNumber: true, min: 0 })}
            />
        </div>
    );
};

export default PiscineForm;