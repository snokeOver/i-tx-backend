export const test = async (req, res) => {
  try {
    res.status(200).send({ message: "Testing good." });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server side error" });
  }
};
