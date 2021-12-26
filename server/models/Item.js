const { Schema, model} = require('mongoose');

const URL_PATTERN = /^https?:\/\//;

const schema = new Schema({
    title: { 
        type: String, 
        required: [true, 'Title is required'], 
    },
    year: { type: String },
    price: { type: Number },
    category: { type: String },
    condition: { 
        type: String,
        required: [true, 'Condition is required'],
    },
    frameSize: { type: String },
    wheelSize: { type: String },
    material: { type: String },
    frontTravel: { type: String },
    rearTravel: { type: String },
    location: { type: String },
    postDate: { type: Date },
    description: { type: String },
    image: { type: String, match: [URL_PATTERN, 'Image must be a valid URL'] },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    
});

module.exports = model('Item', schema);

