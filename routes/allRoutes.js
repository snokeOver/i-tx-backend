import express from "express";
import { test } from "../dbOperations/test.js";

import { checkEamilExist } from "../dbOperations/helper/checkEmailExists.js";
import { checkMobileExists } from "../dbOperations/helper/checkMobileExists.js";
import { loginMobile } from "../dbOperations/postMethods/loginMobile.js";
import { getAllUsers } from "../dbOperations/getMethods/getAllUsers.js";
import { updateAUserStatus } from "../dbOperations/updateMethods/updateAUserStatus.js";
import { refetchUser } from "../dbOperations/postMethods/refetchUser.js";
import { checkUserBalance } from "../dbOperations/helper/checkUserBalance.js";
import { checkAgentRole } from "../dbOperations/helper/checkAgentRole.js";
import { createUser } from "../dbOperations/postMethods/createUser.js";
import { createCashOut } from "../dbOperations/postMethods/createCashOut.js";

// Initiate router
const router = express.Router();

// -------------------------------------  Get operations----------------------------------//
//API test
router.get("/test", test);

// Get all users [Admin only data]
router.get("/all-users/:uid", getAllUsers);
// router.get("/all-users/:uid", verifyToken, verifyAdmin, getAllUsers);

// ---------------------------------  Post Operations ------------------------------------//
//Check if the Email is already in the DB or not [register page data]
router.post("/check-email", checkEamilExist);

//Check if the Mobile is already in the DB or not [register page data]
router.post("/check-phone", checkMobileExists);

//Check if the Balance is enought for the user for transaction [user data]
router.post("/check-user-balance", checkUserBalance);

//Check if the User status is Agetn [user data]
router.post("/check-agent-status", checkAgentRole);

// if Exist do nothing, or Create user with user info [login-register page request]
router.post("/create-user", createUser);

// Create a branc new cash out request [user request]
router.post("/create-cashout", createCashOut);

// Login user with mobile-pin [login-register page request]
router.post("/login", loginMobile);

// Refetch user details [Logged in user request]
router.post("/refetch-user", refetchUser);

// --------------------------------  Update(patch) Operations-----------------------------//

// Update a specific user Status on userModel [admin only data]
router.patch(
  "/update-user-status/:id",
  //   verifyToken,
  //   verifyAdmin,
  updateAUserStatus
);

export default router;
