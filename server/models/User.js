const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  admin: {
    type: Boolean,
    required: true
  },
  adminId: {
      type: Schema.Types.ObjectId,
      // required: true,
      ref: 'Admin'
  },
  documents: [
    {
      documentId: {
        type: Schema.Types.ObjectId,
        ref: 'Document',
        // required: true,
      }
    }
  ],
  password: {
    type: String,
    required: true
  }
});


// UserSchema.pre('save', (next) => {
//   if (this.isNew || this.isModified('password')) {

//     bcrypt.hash(this.password, saltRounds,
//       (err, hashedPassword) => {
//       if (err) {
//         next(err);
//       }
//       else {
//         this.password = hashedPassword;
//         next();
//       }
//     });
//   } else {
//     next();
//   }

// });


// UserSchema.methods.isCorrectPassword = function (password, callback){
//     bcrypt.compare(password, this.password, (err, same) => {
//       if (err) {
//         callback(err);
//       } else {
//         callback(err, same);
//       }
//     });
//   }

module.exports = model('User', UserSchema);