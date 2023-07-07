const { Schema, model} = require('mongoose');

const schema = new Schema({
    username: { type: String, required: true},
    email: { type: String },
    hashedPassword: { type: String , required: true},
    location: { type: String },
    memberSince: { type: Date },
    inbox: {type: Number, default: 0 },
    conversations: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
});

module.exports = model('User', schema);