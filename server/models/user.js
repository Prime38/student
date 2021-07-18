let mongoose = require ('mongoose');
let User = mongoose.Schema
(
    {
        username:
        {
            type: String,
            default: '',
            trim: true,
            required: 'username is required'
        },
        password:
        {
            type: String,
            default: '',
            trim: true,
            required: 'password is required'
        },
        created:
        {
            type: Date,
            default: Date.now
        },
        update:
        {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "users"    
    }
);
module.exports.User = mongoose.model('User', User);