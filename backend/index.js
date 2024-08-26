require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectToDb } = require("./db/dbConfig");
const authRouter = require("./routes/authRouter.routes");
const invoiceRouter = require("./routes/invoices.routes");

connectToDb();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use('/invoices', invoiceRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server listening at", PORT);
});
