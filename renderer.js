const chat = document.getElementById("chat");
const input = document.getElementById("input");

async function sendMessage() {
    const userMessage = input.value.trim();
    if (!userMessage) return;

    chat.innerHTML += `<p><strong>Tú:</strong> ${userMessage}</p>`;
    input.value = "";

    const response = await window.electronAPI.sendMessage(userMessage);
    
    chat.innerHTML += `<p><strong>Blue:</strong> ${response}</p>`;
    chat.scrollTop = chat.scrollHeight;
}
