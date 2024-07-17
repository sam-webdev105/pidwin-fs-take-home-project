import express from "express";
import sync from "./sync.js";
import play from "./play.js";

const router = express.Router();

router.post("/sync", sync);
router.post("/play", play);

export default router;
