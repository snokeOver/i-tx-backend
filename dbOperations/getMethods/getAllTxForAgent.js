import CashOutInModel from "../../shcemas/cashOutINSchema.js";
import errorHandler from "../helper/errorHandler.js";

export const getAllTxForAgent = async (req, res, next) => {
  const agentNumber = req?.params?.amobile || "";
  const txType = req?.query?.type || "";

  try {
    let response;
    if (agentNumber && txType) {
      // If both agentNumber and txType are defined
      response = await CashOutInModel.find({
        agentNumber,
        txType,
        status: "Pending",
      });
    } else {
      // If only agentNumber is defined
      response = await CashOutInModel.find({ agentNumber, status: "Pending" });
    }

    res.status(200).send({
      message: "Pending request retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
