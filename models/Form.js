import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // référence à l'utilisateur
    ref: 'User',
    required: false,
  },
  link: {
    type: String,
    required: true,
    unique: true,
  }
},{timestamps : true});

const Form = mongoose.model('Form', formSchema);

export default Form;
