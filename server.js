require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./models/user.model');
const Router = express.Router();
const userRouter = require('./routes/user.routes');
const gifRouter = require('./routes/gif.routes');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { auth } = require('express-oauth2-jwt-bearer');



const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

  const checkJwt = auth({
    audience: process.env.AUTH_AUDIENCE,
    issuerBaseURL: process.env.AUTH_INNERBASE_URL,
  });



app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// app.use(
//     fileUpload({
//       useTempFiles: true,
//       tempFileDir: './uploads/',
//       limits: { fileSize: 10000000 }, // 10MB max file(s) size
//       abortOnLimit: true // default: false (if true, files will not be uploaded and an error event will be emitted)
//     })
//   );

app.use("/gifs", gifRouter);

app.use('/users', checkJwt, userRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));


