import mongoose from "mongoose";
import { Schema } from "mongoose";


const providerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    problem: {
        type: String,
    },
    aadhaar: {
        type: Number,
        required: true,
        unique: true
    },
    pinCode: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['request', 'pending', 'confirmed'],
        default: 'request'
    },
    state: {
        type: String,
        required: true
    },
    doctorDetails: {
        name: {
            type: String,
        },
        doctorId: {
            type: String,
        }
    },
    appointmentId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }

});


const providerModel = mongoose.model('provider', providerSchema);
export default providerModel;