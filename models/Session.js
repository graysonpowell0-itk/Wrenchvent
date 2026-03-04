const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: ['vent', 'fix'],
    required: true
  },
  // Emotional tracking
  ventDuration: Number, // seconds
  peakEmotion: String,
  resolvedEmotion: String,
  calmMethod: String,
  calmScore: Number,
  intensity: Number,
  
  // Fix details
  category: {
    type: String,
    enum: ['HVAC', 'Plumbing', 'Lock', 'General', 'Electrical', 'Other']
  },
  equipment: String,
  room: String,
  issue: String,
  resolution: String,
  steps: [String],
  worked: Boolean,
  
  // User feedback
  quotes: [String],
  rants: [String],
  note: String,
  
  // Conversation history
  conversation: [{
    from: { type: String, enum: ['ai', 'user'] },
    text: String,
    timestamp: { type: Date, default: Date.now }
  }],
  
  // Media
  photos: [String], // URLs or base64
  
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
sessionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Session', sessionSchema);
