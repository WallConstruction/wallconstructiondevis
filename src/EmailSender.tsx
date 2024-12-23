import emailjs from "@emailjs/browser";

// Function to validate email format
const validateEmail = (email: string): boolean => {
    const emailRegex = /^[\w-\.]+@[\w-\.]+\.[a-z]{2,7}$/i;
    return emailRegex.test(email);
};

interface EmailSenderParams {
    clientName: string;
    clientPhone: string;
    clientEmail: string;
    sector: string;
    surfaceTerrain: number;
    surfaceSousSol: number;
    volumeSousSol: string;
    surfaceRDC: number;
    surfaceEtage: number;
    surfacePiscine: number;
    longueurMurCloture: number;
    totalCost: string;
}

const sendEmails = async (params: EmailSenderParams) => {
    console.log("Sending Emails with Params: ", params);

    // Validation de l'email client
    if (!validateEmail(params.clientEmail)) {
        alert("L'adresse email du client est invalide.");
        return;
    }

    // Sending email to the admin
    try {
        await emailjs.send(
            "service_xx913e9", // Updated Service ID
            "template_7s4vx68", // Updated Template ID for admin
            { ...params },
            "lw377dMVmIS4waf6I" // Public Key
        );
        console.log("Email envoyé à l'admin.");
        alert("Email envoyé à l'administrateur avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email admin :", error);
        alert("Erreur lors de l'envoi de l'email à l'administrateur.");
    }

    // Sending email to the client
    try {
        console.log("Params envoyés au client:", params);
        await emailjs.send(
            "service_xx913e9", // Updated Service ID
            "template_ik31evi", // Updated Template ID for client
            { ...params },
            "lw377dMVmIS4waf6I" // Public Key
        );
        console.log("Email envoyé au client avec succès.");
        alert("Email envoyé au client avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email client :", error);
        alert("Erreur lors de l'envoi de l'email au client.");
    }
};

export default sendEmails;
