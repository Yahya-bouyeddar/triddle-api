import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
      required: true
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Question',
          required: true
        },
        value: {
          type: String,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

const Response = mongoose.model('Response', responseSchema);
export default Response;
