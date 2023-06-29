import express from "express";

import controller from "../controllers/note.js";
import extractFirebaseInfo from "../middlewares/extractFirebaseInfo.js";

const router = express.Router();

router
  .route("/")
  .get(extractFirebaseInfo, controller.fetchNotes)
  .post(extractFirebaseInfo, controller.createNote);
router.route("/recent").get(extractFirebaseInfo, controller.fetchRecentNotes);
router
  .route("/:id")
  .get(extractFirebaseInfo, controller.fetchNote)
  .post(extractFirebaseInfo, controller.updateNote)
  .delete(extractFirebaseInfo, controller.deleteNote);

export default router;
