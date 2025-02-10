document.addEventListener("DOMContentLoaded", () => {
    const chat = document.getElementById("chat");
    const input = document.getElementById("input");
    const sendBtn = document.getElementById("sendBtn");

    async function sendMessage() {
        const userMessage = input.value.trim();
        if (!userMessage) return;

        addMessage("Tú", userMessage, "user");
        input.value = "";

        const response = await window.electronAPI.sendMessage(userMessage);
        addMessage("Blue", response, "bot");

        chat.scrollTop = chat.scrollHeight;
    }

    function addMessage(sender, text, className) {
        const messageElement = document.createElement("p");
        messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
        messageElement.classList.add(className);
        chat.appendChild(messageElement);
    }

    sendBtn.addEventListener("click", sendMessage);
    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") sendMessage();
    });
});
