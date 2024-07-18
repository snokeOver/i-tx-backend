import CashOutInModel from "../../shcemas/cashOutINSchema.js";
import SendMoneyModel from "../../shcemas/sendMoneySchema.js";
import errorHandler from "./errorHandler.js";

export const updateExistingDoc = async (req, res, next) => {
  const newField = {
    rejectReason: "",
  };

  try {
    const result = await SendMoneyModel.updateMany({}, { $set: newField });

    res.status(200).send({
      message: "All Document Updated successfully!",
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
