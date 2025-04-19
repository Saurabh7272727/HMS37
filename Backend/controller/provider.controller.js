import usersModel from '../models/users.model.js';
import providerModel from '../models/provider.model.js';

const entryResgister = async (req, res) => {
    const provider = req.body;
    const appointmentId = Math.floor(Math.random() * 1000000022 + Math.random() * 300006262627);
    const user = req.user;
    const { email } = user;
    const { name, age, gender, problem, aadhaar, address, pinCode, status, state, doctorDetails } = req.body;
    const combineObject = { ...provider, appointmentId, email };
    try {
        if (!name || !age || !gender || !problem) {
            return res.status(403).json({ success: false, message: "All fields are required", status: 'No' });
        };
        const CheckProvider = await providerModel.findOne({ email: email });
        const findByAadhaar = await providerModel.find({ aadhaar: aadhaar });
        if (!findByAadhaar) {
            return res.status(403).json({ success: false, message: `Your aadhaar are already used`, status: 'No' });
        }
        const findUser = await usersModel.findOne({ email: email });
        if (CheckProvider?.aadhaar == aadhaar) {
            return res.status(403).json({ success: false, message: `Your aadhaar are already used`, status: 'No' });
        }
        if (CheckProvider?.doctorDetails?.doctorId == doctorDetails?.doctorId && CheckProvider?.email == email) {
            return res.status(403).json({ success: false, message: `Your Appointment are already ${CheckProvider?.status}`, status: 'No' });
        }

        const insertProvider = providerModel(combineObject);
        await insertProvider.save();

        findUser.Appointment.push(insertProvider._id);
        await findUser.save();

        return res.status(403).json({ success: true, message: `Your request are send`, status: 'Yes' });
    } catch (error) {
        return res.status(505).json({ success: false, message: `Your aadhaar are already used`, status: 'No' });
    }
}


export { entryResgister };