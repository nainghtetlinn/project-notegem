import express from "express";

import controller from "../controllers/note.js";
import extractFirebaseInfo from "../middlewares/extractFirebaseInfo.js";

const router = express.Router();

router.route("/").get(extractFirebaseInfo, controller.fetchNotes);
router.route("/:id").get(extractFirebaseInfo, controller.fetchNote);
router.route("/create").post(extractFirebaseInfo, controller.createNote);
router.route("/update/:id").post(extractFirebaseInfo, controller.updateNote);

export default router;
