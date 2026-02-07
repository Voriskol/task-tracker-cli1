import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { tasksRouter } from "./api/tasks.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/tasks", tasksRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`
    Задачник Web запущен!
    Сервер: http://localhost:${PORT}
    Веб-интерфейс: http://localhost:${PORT}
    CLI продолжает работать: задачник помощь
  `);
});
