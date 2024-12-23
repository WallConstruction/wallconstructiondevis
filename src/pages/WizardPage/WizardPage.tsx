// src/pages/WizardPage/WizardPage.tsx

import React, { useState, useEffect } from "react";
import { Container, Button } from "@mui/material";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    setField,
    computeTotalCost,
    resetTotalCost
} from "../../features/simulation/SimulationSlice";
import emailjs from "@emailjs/browser";
import StepperUI from "../../components/UI/Stepper";

import StepUserInfo from "./steps/StepUserInfo";
import StepSousSol from "./steps/StepSousSol";
import StepRDC from "./steps/StepRDC";
import StepEtage from "./steps/StepEtage";
import StepPiscine from "./steps/StepPiscine";
import StepCloture from "./steps/StepCloture";

const steps = [
    { label: "Infos Utilisateur", component: <StepUserInfo /> },
    { label: "Sous-Sol", component: <StepSousSol /> },
    { label: "RDC", component: <StepRDC /> },
    { label: "Étage", component: <StepEtage /> },
    { label: "Piscine", component: <StepPiscine /> },
    { label: "Clôture", component: <StepCloture /> }
];

function WizardPage() {
    const dispatch = useAppDispatch();
    const simulation = useAppSelector((state) => state.simulation);
    const { totalCost } = simulation;

    const [activeStep, setActiveStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    // 1) Créez votre form en mode "onSubmit" pour la validation
    const methods = useForm({
        defaultValues: simulation,
        mode: "onSubmit"
    });

    const { handleSubmit, watch, formState } = methods;

    const isLastStep = activeStep === steps.length - 1;

    // 2) À chaque frappe, on stocke directement dans Redux :
    const allFields = watch();
    useEffect(() => {
        // Chaque champ modifié -> dispatch vers Redux
        Object.entries(allFields).forEach(([field, value]) => {
            dispatch(setField({ field, value }));
        });
        // On ne fait pas de resetTotalCost ici,
        // sinon le coût disparaîtrait au moindre changement
    }, [allFields, dispatch]);

    // 3) Soumission d’une étape intermédiaire
    const onStepSubmit = () => {
        // -> Validation "onSubmit" se lance,
        //    si le form est OK, on passe à l'étape suivante
        setCompletedSteps((prev) => (prev.includes(activeStep) ? prev : [...prev, activeStep]));
        dispatch(resetTotalCost());  // On force un recalcul plus tard
        setActiveStep((s) => s + 1);
    };

    // 4) Soumission finale
    const onFinalSubmit = () => {
        dispatch(computeTotalCost());
        // Envoi email (même code que vous avez déjà)
        setTimeout(() => {
            const finalCost = simulation.totalCost || 0;
            const recap = `Nom: ${simulation.name}\nTéléphone: ${simulation.phonePrefix} ${simulation.phoneNumber}\nCoût: ${finalCost} MAD\n...`;
            // EmailJS client, admin...
            // ...
            alert("Devis envoyé au client et à l'admin !");
        }, 100);

        setCompletedSteps((prev) => (prev.includes(activeStep) ? prev : [...prev, activeStep]));
    };

    // 5) Navigation
    const goBack = () => {
        setActiveStep((s) => s - 1);
    };
    const handleStepClick = (index: number) => {
        if (index <= activeStep) setActiveStep(index);
    };

    return (
        <FormProvider {...methods}>
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <StepperUI
                    steps={steps}
                    activeStep={activeStep}
                    onStepClick={handleStepClick}
                    completedSteps={completedSteps}
                />

                {/*
          onSubmit : si c’est la dernière étape => onFinalSubmit
                     sinon => onStepSubmit
        */}
                <form onSubmit={handleSubmit(isLastStep ? onFinalSubmit : onStepSubmit)}>
                    <div style={{ marginTop: "2rem" }}>
                        {steps[activeStep].component}
                    </div>

                    <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
                        {activeStep > 0 && (
                            <Button variant="outlined" onClick={goBack}>
                                Précédent
                            </Button>
                        )}

                        {!isLastStep && (
                            <Button type="submit" variant="contained">
                                Suivant
                            </Button>
                        )}
                        {isLastStep && (
                            <Button type="submit" variant="contained">
                                Calculer + Email
                            </Button>
                        )}
                    </div>
                </form>

                {totalCost !== null && (
                    <div style={{ marginTop: "2rem", fontWeight: "bold" }}>
                        Coût Total Estimé : {totalCost.toFixed(2)} MAD
                    </div>
                )}

                {Object.keys(formState.errors).length > 0 && (
                    <div style={{ color: "red", marginTop: "1rem" }}>
                        Veuillez corriger les champs en erreur.
                    </div>
                )}
            </Container>
        </FormProvider>
    );
}

export default WizardPage;