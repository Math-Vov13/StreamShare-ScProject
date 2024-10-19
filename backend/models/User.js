// models/User.js
import mongoose from 'mongoose';  // Use 'import' instead of 'require'
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Use 'export default' to export the model as the default export
const User = mongoose.model('User', UserSchema);

export default User;  // This is crucial for ES Modules
