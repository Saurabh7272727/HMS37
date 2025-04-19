import { Schema } from 'mongoose';
import mongoose from 'mongoose';



const bedSchema = new Schema({
    roomNumber: {
        type: Number,
    },
    beds: [
        {
            bedNumber: {
                type: Number,
            },
            backgroundColor: {
                type: String,
            },
            booked: {
                type: Boolean,
            }
        }
    ]
});


const bedModel = mongoose.model('listofbed', bedSchema);
export default bedModel;