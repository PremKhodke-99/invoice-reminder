require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectToDb } = require("./db/dbConfig");
const authRoutes = require("./routes/authRouter.routes");
const invoiceRoutes = require("./routes/invoices.routes");
const zapierRoutes = require("./routes/zapier.routes")

connectToDb();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/zapier', zapierRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server listening at", PORT);
});
