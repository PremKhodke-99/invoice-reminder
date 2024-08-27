const Invoice = require("../models/invoice.model");

const router = require("express").Router();

const invoices = [
  {
    userId: 1,
    description: "Phone Bill",
    amount: 100,
    dueDate: new Date("2024-08-01").toDateString(),
    recipient: "abc@gmail.com",
  },
  {
    userId: 2,
    description: "Electricity Bill",
    amount: 150,
    dueDate: new Date("2024-08-05").toDateString(),
    recipient: "xyz@gmail.com",
  },
  {
    userId: 3,
    description: "Water Bill",
    amount: 80,
    dueDate: new Date("2024-09-10").toDateString(),
    recipient: "abc@gmail.com",
  },
  {
    userId: 4,
    description: "Insurance Bill",
    amount: 200,
    dueDate: new Date("2024-09-15").toDateString(),
    recipient: "xyz@gmail.com",
  },
  {
    userId: 5,
    description: "Land Bill",
    amount: 500,
    dueDate: new Date("2024-10-20").toDateString(),
    recipient: "pqr@gmail.com",
  },
];

// router.get("/", async (req, res) => {
//   // const invoices = await Invoice.find({ userId: req.user._id });
//   res.json(invoices);
// });

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  
  const invoices = await Invoice.find({ userId: userId });
  
  res.json(invoices);
});

router.post("/add", async (req, res) => {
  console.log(1);

  const { userId, description, amount, dueDate, recipient } = req.body;
  const newInvoice = new Invoice({
    userId,
    description,
    amount,
    dueDate,
    recipient,
  });
  await newInvoice.save();
  res.json(newInvoice);
});

module.exports = router;
