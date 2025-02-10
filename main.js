const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const axios = require("axios");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile("index.html");
});

ipcMain.handle("send-message", async (event, message) => {
  try {
    const response = await axios.post("http://192.168.3.2:1234/v1/chat/completions", {
      messages: [{ role: "user", content: message }],
      model: "your-model-name"
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error al conectar con la IA:", error);
    return "Error al conectar con Blue.";
  }
});
