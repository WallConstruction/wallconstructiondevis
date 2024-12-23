// src/components/forms/EtageForm.tsx
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface EtageFormProps {
    register: UseFormRegister<any>;
}

const EtageForm: React.FC<EtageFormProps> = ({ register }) => {
    return (
        <div style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}>
            <h2>1er Étage</h2>
            <label>Surface du 1er Étage (m²) : </label>
            <input
                type="number"
                {...register("surfaceEtage", { valueAsNumber: true, min: 0 })}
            />

            <br />

            <label>
                <input type="checkbox" {...register("hasPostTensionEtage")} />
                &nbsp;Post-Tension ?
            </label>
        </div>
    );
};

export default EtageForm;