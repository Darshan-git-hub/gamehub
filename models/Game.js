// models/Game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imgUrl: { type: String, required: true },
    category: {
        type: String,
        enum: ['upcoming', 'featured', 'latest'],
        required: true
    }
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
