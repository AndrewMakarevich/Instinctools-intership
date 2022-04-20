require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToTheMongoDB } = require('./db');
const errorMiddleware = require('./middleware/errorMiddleware');
const mainRouter = require('./routes');

const app = express();
app.use(
  cors({
    origin: [process.env.FRONT_APP_LINK, 'http://localhost'],
  })
);
app.use(express.json());
app.use('/api', mainRouter);
app.use(errorMiddleware);
const PORT = process.env.PORT || 5000;

async function start() {
  try {
    connectToTheMongoDB();
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
start();
