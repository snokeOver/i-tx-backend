import express from "express";
import { test } from "../dbOperations/test.js";

// Initiate router
const router = express.Router();

//API test
router.get("/test", test);

export default router;
