
const shareOnWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
};

export default shareOnWhatsApp;
