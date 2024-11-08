require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Expenses = require('./models/Expenses')
const expenseRoute = require('../backend/route/expenseRoutes')
const cors = require('cors')


const app = express();


const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
  return response.status(200).send("<H1>Welcome to the expense tracking app</H1>");
});

app.use('/api/expenses', expenseRoute)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running successfully at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection error:", error.message);
  });

