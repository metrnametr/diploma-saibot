const { Schema, model } = require('mongoose');

const DocumentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    adminId: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    // usersAssign: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'User',
    //         required: true
    //     }
    // ]
})


module.exports = model('Document', DocumentSchema);