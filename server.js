require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./models/user.model');
const Router = require('express').Router;
const userRouter = require('./routes/user.routes');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
// app.use(
//     fileUpload({
//       useTempFiles: true,
//       tempFileDir: './uploads/',
//       limits: { fileSize: 10000000 }, // 10MB max file(s) size
//       abortOnLimit: true // default: false (if true, files will not be uploaded and an error event will be emitted)
//     })
//   );

app.use('/users', userRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
