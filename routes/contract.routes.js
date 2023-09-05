const express = require("express");
const router = express.Router();
const smartContractController = require("../controllers/smartContract.controller");
const authState = require("../middlewares/authState");

router.post(
  "/create-smart-contract",
  authState.verifyTokenAndAttachUser,
  smartContractController.createSmartContract
);
router.post(
  "/find-smart-contract/:contractAddress",
  authState.verifyTokenAndAttachUser,
  smartContractController.findSmartContract
);
router.put(
  "/update-smart-contract/:id",
  authState.verifyTokenAndAttachUser,
  smartContractController.updateSmartContractById
);

module.exports = router;
