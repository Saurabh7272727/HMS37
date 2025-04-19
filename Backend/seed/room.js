import bedModel from '../models/bed.list.model.js';
import data from '../data.json' assert { type: 'json' };
console.log(data);

const room = async () => {
    try {
        data.forEach(async (items) => {
            const insertData = bedModel(items);
            await insertData.save().then(() => {
                console.log('data saved');
            });
        });
    } catch (error) {
        return console.log(`Error inserting data ${error.message}`);
    }
}


export default room;