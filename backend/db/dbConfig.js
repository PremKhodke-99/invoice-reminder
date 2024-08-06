const mongoose = require("mongoose");

const connectToDb = () => {
    mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to Database'))
    .catch((error) => console.error('Failed to connect to database', error))
}

module.exports = {
    connectToDb,
}