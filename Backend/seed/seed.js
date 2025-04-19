import room from './room.js';



const seed = async () => {
    console.log('Seeding');
    await room();
    console.log('Seeding are completed successfully');
}


seed();