const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
require('dotenv').config();

const configs = require('./config/config');
const { userRouter, authRouter, carRouter } = require("./router");
const { cronRunner } = require("./cron");
const swaggerJSON = require('./swagger.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/cars', carRouter);

app.get('/', (req, res) => {
   res.json('Welcome');
});

app.use((err, req, res, next ) => {
    res.status(err.status || 500).json(err.message);
});

app.listen(configs.PORT, async () => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(configs.MONGO_URL);
    console.log(`Server listen ${configs.PORT}`);
    cronRunner();
});
