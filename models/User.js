import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
       type: String,
       required: [true, 'Please provide name'],
       minlength: 3,
       maxlength: 20,
       trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6
    },
    lastName: {
        type: String,
        maxlength: 20,
        default: 'Last Name',
        trim: true
    },
    location: {
        type: String,
        maxlength: 20,
        default: 'my city',
        trim: true
    }
});

export default mongoose.model('User', UserSchema);