import { Request, Response } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import asyncHandler from "express-async-handler";

import Note from "../models/note.js";

const fetchNotes = asyncHandler(async (req: Request, res: Response) => {
  const firebaseInfo = res.locals.firebase as DecodedIdToken;
  const result = await Note.find({ uid: firebaseInfo.uid }).sort({
    createdAt: -1,
  });
  res.status(200).json(result);
});

const fetchRecentNotes = asyncHandler(async (req: Request, res: Response) => {
  const firebaseInfo = res.locals.firebase as DecodedIdToken;
  const result = await Note.find({ uid: firebaseInfo.uid })
    .sort({
      updatedAt: -1,
    })
    .limit(3);
  res.status(200).json(result);
});

const fetchNote = asyncHandler(async (req: Request, res: Response) => {
  const firebaseInfo = res.locals.firebase as DecodedIdToken;
  const { id } = req.params;
  const result = await Note.findOne({ uid: firebaseInfo.uid, _id: id });
  if (!result) {
    res.status(404);
    throw new Error("Note not found");
  }
  res.status(200).json(result);
});

const createNote = asyncHandler(async (req: Request, res: Response) => {
  const firebaseInfo = res.locals.firebase as DecodedIdToken;

  const result = await Note.create({ uid: firebaseInfo.uid });

  res.status(200).json(result);
});

const updateNote = asyncHandler(async (req: Request, res: Response) => {
  const firebaseInfo = res.locals.firebase as DecodedIdToken;
  const { id } = req.params;
  const { title, content } = req.body;

  const result = await Note.findOneAndUpdate(
    { _id: id, uid: firebaseInfo.uid },
    { title, content },
    { new: true }
  );

  if (!result) {
    res.status(404);
    throw new Error("Note not found");
  }

  res.status(200).json(result);
});

const deleteNote = asyncHandler(async (req: Request, res: Response) => {
  const firebaseInfo = res.locals.firebase as DecodedIdToken;
  const { id } = req.params;

  const result = await Note.findOneAndDelete({
    uid: firebaseInfo.uid,
    _id: id,
  });

  if (!result) {
    res.status(404);
    throw new Error("Note not found");
  }

  res.status(202).json({ _id: result._id });
});

export default {
  fetchNotes,
  fetchRecentNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
};
