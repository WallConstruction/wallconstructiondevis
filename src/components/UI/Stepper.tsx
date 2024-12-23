// src/components/UI/Stepper.tsx
import React from "react";
import {
    Stepper,
    Step,
    StepLabel,
    StepButton,
    SxProps,
    Theme
} from "@mui/material";

export interface StepData {
    label: string;
    component: React.ReactNode;       // Le composant du formulaire / step
    description?: string;             // Optionnel : description brève de l’étape
}

interface StepperUIProps {
    steps: StepData[];
    activeStep: number;
    /**
     * Fonction appelée lorsqu’on clique sur une étape (pour navigation libre).
     * Si vous ne voulez pas de clic possible, ne passez rien.
     */
    onStepClick?: (stepIndex: number) => void;
    /**
     * Liste des index d’étapes déjà complétées.
     * Permet d’afficher un check ou une couleur distincte sur ces étapes.
     */
    completedSteps?: number[];
}

/**
 * Composant Stepper amélioré :
 * - Étapes cliquables
 * - Couleurs personnalisées
 * - Affichage des étapes terminées
 */
function StepperUI({
                       steps,
                       activeStep,
                       onStepClick,
                       completedSteps = []
                   }: StepperUIProps) {
    // Style pour personnaliser la couleur des steps
    const stepperStyles: SxProps<Theme> = {
        "& .MuiStepLabel-root .Mui-completed": {
            color: "green" // Couleur des étapes terminées
        },
        "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel": {
            color: "green"
        },
        "& .MuiStepLabel-root .Mui-active": {
            color: "secondary.main" // Couleur de l’étape active
        },
        "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
            color: "secondary.main"
        }
        // vous pouvez ajouter d'autres styles selon vos besoins
    };

    return (
        <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={stepperStyles}
        >
            {steps.map((step, index) => {
                const isCompleted = completedSteps.includes(index);

                return (
                    <Step
                        key={index}
                        completed={isCompleted}
                    >
                        {/** StepButton permet de rendre l'étape cliquable */}
                        <StepButton onClick={() => onStepClick?.(index)}>
                            <StepLabel>{step.label}</StepLabel>
                        </StepButton>
                    </Step>
                );
            })}
        </Stepper>
    );
}

export default StepperUI;