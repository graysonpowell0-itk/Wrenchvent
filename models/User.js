const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    default: 'Marcus Johnson'
  },
  hotel: {
    type: String,
    default: 'Grand Hyatt'
  },
  avatar: String, // base64 or URL
  
  // Preferences
  voicePreference: {
    type: String,
    default: 'ito',
    enum: ['ito', 'kora', 'stella', 'dacher', 'finn', 'rio']
  },
  
  // Equipment profile
  equipmentProfile: [{
    type: { type: String },
    model: String
  }],
  
  // Stats
  stats: {
    totalSessions: { type: Number, default: 0 },
    totalFixes: { type: Number, default: 0 },
    totalVents: { type: Number, default: 0 },
    totalVentTime: { type: Number, default: 0 }, // seconds
    avgIntensity: { type: Number, default: 0 }
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
});

// Update last active on any operation
userSchema.pre('save', function(next) {
  this.lastActive = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);
