import express from "express";
import {
  addTask,
  updateTask,
  deleteTask,
  markTask,
  getTasks,
} from "../lib/taskManager.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filter = req.query.filter || "все";
    const tasks = await getTasks(filter);

    res.json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tasks = await getTasks("все");
    const task = tasks.find((task) => task.id === parseInt(req.params.id));

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Задача не найдена",
      });
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// router.post('/', async (req, res) => {
//     try {
//         const {description} = req.body;

//         if (!description || !description.trim()) {
//             return res.status(400).json()
//         }
//     }
// })


export default router;
