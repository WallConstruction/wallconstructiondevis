// src/components/forms/RDCForm.tsx
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface RDCFormProps {
    register: UseFormRegister<any>;
}

const RDCForm: React.FC<RDCFormProps> = ({ register }) => {
    return (
        <div style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}>
            <h2>RDC</h2>
            <label>Surface du RDC (m²) : </label>
            <input
                type="number"
                {...register("surfaceRDC", { valueAsNumber: true, min: 0 })}
            />

            <br />

            <label>
                <input type="checkbox" {...register("hasPostTensionRDC")} />
                &nbsp;Post-Tension ?
            </label>
        </div>
    );
};

export default RDCForm;