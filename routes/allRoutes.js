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
import { getAllTxForAgent } from "../dbOperations/getMethods/getAllTxForAgent.js";
import { updatePendingTx } from "../dbOperations/updateMethods/updatePendingTx.js";
import { createCashOutIN } from "../dbOperations/postMethods/createCashOutIN.js";
import { checkUserRole } from "../dbOperations/helper/checkUserRole.js";
import { createSendMoney } from "../dbOperations/postMethods/createSendMoney.js";

// Initiate router
const router = express.Router();

// -------------------------------------  Get operations----------------------------------//
//API test
router.get("/test", test);

// Get all users [Admin only data]
router.get("/all-users/:uid", getAllUsers);
// router.get("/all-users/:uid", verifyToken, verifyAdmin, getAllUsers);

// Get all Transactions including Cash out and Cash In for specific Agent [Agent only data]
router.get("/agent-pending-tx/:amobile", getAllTxForAgent);

// ---------------------------------  Post Operations ------------------------------------//
//Check if the Email is already in the DB or not [register page data]
router.post("/check-email", checkEamilExist);

//Check if the Mobile is already in the DB or not [register page data]
router.post("/check-phone", checkMobileExists);

//Check if the Balance is enought for the user for transaction [user data]
router.post("/check-user-balance", checkUserBalance);

//Check if the recipient status is Agent [user data]
router.post("/check-agent-status", checkAgentRole);

//Check if the recipient status is User [user data]
router.post("/check-recipient-status", checkUserRole);

// if Exist do nothing, or Create user with user info [login-register page request]
router.post("/create-user", createUser);

// Create a brand new cash out or cash In request [user request]
router.post("/create-cashout-cashin", createCashOutIN);

// Create a brand new send money [user request]
router.post("/create-send-money", createSendMoney);

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

// Update a specific pending cash out/ cash In tx request [Agent only data]
router.patch(
  "/update-pending-tx/:id",
  //   verifyToken,
  //   verifyAdmin,
  updatePendingTx
);

export default router;
