import express from 'express';
import { addQuestion, getQuestionsByForm } from '../controllers/question.controller.js';
import protect from '../middleware/protect.js';

const router = express.Router();

router.post('/forms/:formId/questions',protect, addQuestion);

router.get('/forms/:formId/questions',protect, getQuestionsByForm);

export default router;
