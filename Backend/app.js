import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import userRouter from './routes/users.route.js';
import dataBaseConnect from './db/db.js';
import morgan from 'morgan';
import providerRouter from './routes/provider.route.js';
import bedRouter from './routes/book.route.js';
import providerModel from './models/provider.model.js';
import bookingModel from './models/booking.model.js';
import bedModel from './models/bed.list.model.js';
const app = express();
app.use(cors({ origin: '*', methods: ['GET', 'POST'], credentials: true }))
app.use(express.json());
app.use(morgan('dev'));
dataBaseConnect();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/patient', userRouter);
app.use('/provider', providerRouter);
app.use('/book', bedRouter);
app.get('/appointment', async function (req, res) {
    try {
        const findAppointmentComfirmed = await providerModel.find({ status: "confirmed" });
        res.status(201).json({ message: "success", status: "Yes", data: findAppointmentComfirmed });
    } catch (error) {
        if (error) {
            console.log(error.message);
        }
    }
});

app.get('/applog', async function (req, res) {
    try {
        const findAppointmentComfirmed = await providerModel.find({ status: "request" });
        res.status(201).json({ message: "success", status: "Yes", data: findAppointmentComfirmed });
    } catch (error) {
        if (error) {
            console.log(error.message);
        }
    }
});

app.post('/submit', async function (req, res) {
    const { id } = req.body;
    if (!id) {
        return res.json({ message: "id not found" });
    }
    const findByIdIN = await providerModel.findByIdAndUpdate(id, { status: "confirmed" }, { new: true });
    res.json({ message: "yes appointment commit changes" });
});


app.post('/deleteApp', async function (req, res) {
    try {
        const { id } = req.body;
        if (!id) {
            return res.json({ message: "id not found" });
        }
        const findByIdIN = await providerModel.findByIdAndDelete(id);
        res.json({ message: "yes appointment commit changes" });
        return;
    } catch (error) {
        if (error) {
            console.log(error);
        }
    }
});


app.get('/bookingList', async function (req, res) {
    try {
        const findAppointmentComfirmed = await bookingModel.find();
        res.status(201).json({ message: "success", status: "Yes", data: findAppointmentComfirmed });
    } catch (error) {
        if (error) {
            console.log(error.message);
        }
    }
});

app.get('/bedList', async function (req, res) {
    const data = await bedModel.find({});
    res.json({ data });
})
export default app;
