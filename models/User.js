const mongoose = require('mongoose');


// Schema Creation
const userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstName: {type: 'string', required: true},
    lastName: {type: 'string', required: true},
    email: {
        type: 'string', required: true, unique: true, match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i},
    password: {type: 'string', required: true}
});

//Model creation
module.exports=mongoose.model('User', userSchema);
