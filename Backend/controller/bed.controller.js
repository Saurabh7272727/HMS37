import bedModel from '../models/bed.list.model.js';
import providerModel from '../models/provider.model.js';
import bookingModel from '../models/booking.model.js';
import usersModel from '../models/users.model.js';


const bedRegister = async (req, res) => {
    const user = req.user;
    const { email } = user;
    const frontendData = req.body;

    const { name, aadhaar, admissionDate, admissionTime, roomNumber, bedNumber } = frontendData;
    if (!name || !aadhaar || !admissionDate) {
        return res.status(403).json({ success: false, message: "All fields are required", status: "No" });
    }
    try {
        const findByAadhaar = await bookingModel.findOne({ aadhaar: aadhaar });
        const findByRoomAndBedNumber = await bookingModel.findOne({ roomNumber: roomNumber, bedNumber: bedNumber });

        if (findByAadhaar) {
            return res.status(303).json({ success: false, message: "Aadhaar are already used", status: "No" });
        };

        if (findByRoomAndBedNumber) {
            return res.status(303).json({ success: false, message: "Bed are already booked", status: "No" });
        }
        const findRoomAndBed = await bedModel.findOne({ roomNumber: roomNumber });
        const newDatajjj = findRoomAndBed?.beds;
        const checkBedAreEmpty = newDatajjj.filter((items) => {
            return items.bedNumber === bedNumber;
        });


        if (checkBedAreEmpty?.booked) {
            return res.status(403).json({ success: false, message: "this bed are already booked", status: "No" });
        }
        checkBedAreEmpty[0].booked = true;
        checkBedAreEmpty[0].backgroundColor = 'red';
        await findRoomAndBed.save();

        const bookingId = Math.floor(Math.random() * 1000000022 + Math.random() * 300006262627);
        const combineObject = { bookingId, email, ...frontendData }
        const insertData = bookingModel(combineObject);
        await insertData.save();


        const findUser = await usersModel.findOne({ email: email });
        findUser?.booking.push(insertData._id);
        findUser.save();

        Object.freeze(insertData, findUser);

        return res.status(201).json({ success: true, message: "Booking successfully", status: "Yes" });
    } catch (error) {
        console.log(error);
        return res.status(505).json({ success: false, message: "somrthing was wrong", status: error.message });
    }
}


const showRoomList = async (req, res) => {
    const findAllData = await bedModel.find();
    res.send(findAllData);
}

const print = async (req, res) => {
    const { bookingId } = req.body;
    try {
        const findByBookingId = await bookingModel.findOne({ bookingId: bookingId });
        console.log(findByBookingId);
        setTimeout(() => {
            if (findByBookingId) {
                return res.status(203).json({ success: true, message: "Found", status: "Yes", data: findByBookingId });
            }
            return res.status(203).json({ success: false, message: "Not found", status: "No" });
        }, 2000);
    } catch (error) {
        return res.status(203).json({ success: false, message: error.message, status: "No" });
    }
}
export { bedRegister, showRoomList, print };