
import React from "react";

interface ResultDisplayProps {
    cost: number | null;
    volumeSousSol: number | null;
    onWhatsAppShare: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ cost, volumeSousSol, onWhatsAppShare }) => {
    return (
        <div className="result-container">
            {cost !== null && (
                <>
                    <h2>Coût Total Estimé : {cost.toFixed(2)} MAD</h2>
                    {volumeSousSol !== null && (
                        <p>Volume du Sous-Sol : {volumeSousSol.toFixed(2)} m³</p>
                    )}
                    <button className="whatsapp-button" onClick={onWhatsAppShare}>
                        Partager via WhatsApp
                    </button>
                </>
            )}
        </div>
    );
};

export default ResultDisplay;
