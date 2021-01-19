const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        await mongoose.connect(process.env.DB_CNN_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Online')

    } catch(err) {
        console.log(err);
        throw new Error('Error en la BBDD')
    }
}

module.exports = {
    dbConnection
}