const router = require("express").Router();
const axios = require("axios");
const Invoice = require("../models/invoice.model");

router.post("/trigger", async (req, res) => {
  const { invoiceId } = req.body;  
  const invoice = await Invoice.findById(invoiceId);
  console.log(invoice);
  
  if (!invoice) {
    return res.status(404).send("Invoice not found");
  }

  // Trigger Zapier webhook
  try {
    console.log(1);
    const response = await axios.post(process.env.ZAPIER_WEBHOOK_URL, {
      invoiceId,
      description: invoice.description,
      amount: invoice.amount,
      dueDate: invoice.dueDate,
      recipient: invoice.recipient,
    });
    console.log(response);
    
    res.status(200).send("Zapier automation triggered");
  } catch (error) {
    res.status(500).send("Error triggering Zapier");
  }
});

module.exports = router;
