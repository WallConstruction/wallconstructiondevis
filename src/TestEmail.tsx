import emailjs from "@emailjs/browser";

const TestEmail = async () => {
    const testParams = {
        clientName: "Test User",
        clientPhone: "+212 612345678",
        clientEmail: "test@example.com",
        sector: "Test Sector",
        surfaceTerrain: 100,
        surfaceSousSol: 50,
        volumeSousSol: "200",
        surfaceRDC: 150,
        surfaceEtage: 100,
        surfacePiscine: 30,
        longueurMurCloture: 20,
        totalCost: "500000",
    };

    try {
        const result = await emailjs.send(
            "service_tkylaqq", // Service ID
            "template_7s4vx68", // Template ID
            testParams,
            "lw377dMVmIS4waf6I" // Public Key
        );
        console.log("Email sent successfully:", result);
    } catch (error) {
        console.error("Error sending test email:", error);
    }
};

TestEmail();
