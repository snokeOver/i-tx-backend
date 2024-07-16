import express from "express";
import { test } from "../dbOperations/test.js";
import { createUser } from "../dbOperations/postMethods/createUser.js";
import { checkEamilExist } from "../dbOperations/helper/checkEmailExists.js";
import { checkMobileExists } from "../dbOperations/helper/checkMobileExists.js";
import { loginMobile } from "../dbOperations/postMethods/loginMobile.js";

// Initiate router
const router = express.Router();

// --------------------  Get operations-----------------------------//
//API test
router.get("/test", test);

// --------------------  Post Operations ----------------------------//
//Check if the Email is already in the DB or not [register page data]
router.post("/check-email", checkEamilExist);

//Check if the Mobile is already in the DB or not [register page data]
router.post("/check-phone", checkMobileExists);

// if Exist do nothing, or Create user with user info [login-register page request]
router.post("/create-user", createUser);

// Login user with mobile-pin [login-register page request]
router.post("/login", loginMobile);

export default router;
