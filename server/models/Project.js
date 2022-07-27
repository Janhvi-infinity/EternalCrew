const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This fild is required. '
    },
    description: {
        type: String,
        required: 'This fild is required. '
    },
    email: {
        type: String,
        required: 'This fild is required. '
    },
    technology: {
        type: Array,
        required: 'This fild is required.'
    },
    domain: {

        type: String,
        enum: ["Hardware","Software"],
        required: 'This fild is required.'
    },

    category: {

        type: String,
        enum: [ 'IoT' , 'App Devlopment' , '3D Printing' , 'COA' , 'Web Devlopment' , 'DS' ],
        required: 'This fild is required.'
    },

    image: {
        type: String,
        required: 'This fild is required.'
    }

});
projectSchema.index({name: 'text', description: 'text'});
module.exports = mongoose.model('Project', projectSchema);
