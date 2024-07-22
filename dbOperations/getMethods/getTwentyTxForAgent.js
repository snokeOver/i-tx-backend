import CashOutInModel from "../../shcemas/cashOutINSchema.js";
import SendMoneyModel from "../../shcemas/sendMoneySchema.js";
import errorHandler from "../helper/errorHandler.js";

export const getTwentyTxForAgent = async (req, res, next) => {
  const agentNumber = req?.params?.amobile || "";
  const status = req?.query?.status || "";

  try {
    let response;
    let cashOutInResponse;
    let sendMoneyResponse;

    // If both agentNumber and status are defined
    if (agentNumber && status) {
      // Get the last 20 cashoutin data
      cashOutInResponse = await CashOutInModel.find({
        agentNumber,
        status,
      })
        .sort({ createdAt: -1 })
        .limit(20);

      // Get the last 20 send money data
      sendMoneyResponse = await SendMoneyModel.find({
        agentNumber,
        status,
      })
        .sort({ createdAt: -1 })
        .limit(20);
    }

    // console.log(cashOutInResponse);

    // Merge the results and sort them by createdAt field
    response = [...cashOutInResponse, ...sendMoneyResponse];
    response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Limit the total number of transactions to 20
    response = response.slice(0, 20);

    res.status(200).send({
      message: "Pending request retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
