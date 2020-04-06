const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const AdminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  admin: {
    type: Boolean,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

  AdminSchema.methods.addToDocuments = function(document) {
    const items = [ ...this.documents, { documentId: document._id } ];
    this.documents = items;
    return this.save();
  }

  AdminSchema.methods.addToUsers = function(user) {
    const items = [ ...this.users, { userId: user._id } ];

    this.users = items;
    return this.save()
  }

module.exports = model('Admin', AdminSchema);