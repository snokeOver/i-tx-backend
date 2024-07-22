import CashOutInModel from "../../shcemas/cashOutINSchema.js";
import SendMoneyModel from "../../shcemas/sendMoneySchema.js";
import errorHandler from "../helper/errorHandler.js";

export const getTenTxForUser = async (req, res, next) => {
  const userNumber = req?.params?.amobile || "";
  const status = req?.query?.status || "";

  try {
    let response;
    let cashOutInResponse;
    let sendMoneyResponse;

    // If both userNumber and status are defined
    if (userNumber && status) {
      // Get the last 10 cashoutin data
      cashOutInResponse = await CashOutInModel.find({
        userNumber,
        status,
      })
        .sort({ createdAt: -1 })
        .limit(10);

      // Get the last 10 send money data
      sendMoneyResponse = await SendMoneyModel.find({
        userNumber,
        status,
      })
        .sort({ createdAt: -1 })
        .limit(10);
    }

    // console.log(cashOutInResponse);

    // Merge the results and sort them by createdAt field
    response = [...cashOutInResponse, ...sendMoneyResponse];
    response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Limit the total number of transactions to 10
    response = response.slice(0, 10);

    res.status(200).send({
      message: "Pending request retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
