import { Schema } from 'mongoose';
import mongoose from 'mongoose';



const bookingSchema = new Schema({
    bookingId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    aadhaar: {
        type: Number,
        required: true,
    },
    admissionDate: {
        type: String,
    },
    admissionTime: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    roomNumber: {
        type: Number,
        required: true,
    },
    bedNumber: {
        type: Number,
        required: true,
    }
});


const bookingModel = mongoose.model('bed', bookingSchema);
export default bookingModel;