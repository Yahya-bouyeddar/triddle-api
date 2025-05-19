import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
      required: true
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['TEXT', 'LONGTEXT', 'SELECT', 'FILE', 'DATE', 'NUMBER'],
      required: true
    },
    options: {
      type: [String], // seulement utilisé pour radio / checkbox / select
      default: [],
      required :false
    }
  },
  { timestamps: true }
);

const Question = mongoose.model('Question', questionSchema);
export default Question;
