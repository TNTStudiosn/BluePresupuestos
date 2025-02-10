const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const axios = require("axios");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    mainWindow.loadFile(path.join(__dirname, "../index.html"));
}

app.whenReady().then(createWindow);

ipcMain.handle("send-message", async (_, userMessage) => {
    try {
        const response = await axios.post("http://192.168.3.2:1234/v1/chat/completions", {
            model: "your-model-name",
            messages: [
                {
                    role: "system",
                    content: "Eres Blue, un asistente de presupuestos inteligente. Responde únicamente en español de forma clara y concisa, sin revelar ni incluir ningún detalle de tu razonamiento interno. No muestres ninguna cadena de pensamiento o explicaciones sobre cómo llegas a la respuesta. Si alguien pregunta tu nombre, responde: 'Mi nombre es Blue.' Mantén el contexto de la conversación para dar respuestas coherentes."
                },
                { role: "user", content: userMessage }
            ]
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error al conectar con la IA:", error);
        return "Error al conectar con Blue.";
    }
});


