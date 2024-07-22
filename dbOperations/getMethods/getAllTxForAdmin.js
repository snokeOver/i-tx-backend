import CashOutInModel from "../../shcemas/cashOutINSchema.js";
import SendMoneyModel from "../../shcemas/sendMoneySchema.js";
import errorHandler from "../helper/errorHandler.js";

export const getAllTxForAdmin = async (req, res, next) => {
  const status = req?.query?.status || "";
  // console.log(req?.query);

  try {
    let response;
    let cashOutINResponse;
    let sendMoneyResponse;

    // Get the last 20 cashoutin transaction data
    cashOutINResponse = await CashOutInModel.find({ status })
      .sort({ createdAt: -1 })
      .limit(20);

    // Get the last 20 sendmoney transaction data
    sendMoneyResponse = await SendMoneyModel.find({ status })
      .sort({ createdAt: -1 })
      .limit(20);

    // Merge the results and sort them by createdAt field from latest to old
    response = [...cashOutINResponse, ...sendMoneyResponse];
    response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).send({
      message: `Latest 20 ${status} transactions retrieved successfully!`,
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
