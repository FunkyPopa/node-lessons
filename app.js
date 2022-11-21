const express = require('express');
require('dotenv').config();

const userRouter = require('./routers/user.router');
const carRouter = require('./routers/car.router')
const configs = require('./config/config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/cars', carRouter);

app.use((err, req, res, next ) => {
    res.status(err.status || 500).json(err.message)
});

app.listen(configs.PORT, () => {
    console.log(`Server listen ${configs.PORT}`);
});
