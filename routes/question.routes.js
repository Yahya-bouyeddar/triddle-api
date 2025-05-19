import express from 'express';
import { addQuestion, getQuestionsByForm } from '../controllers/question.controller.js';
import protect from '../middleware/protect.js';

const router = express.Router();

// 🟢 Ajouter une question à un formulaire
router.post('/forms/:formId/questions',protect, addQuestion);

// 🟢 Obtenir toutes les questions d’un formulaire
router.get('/forms/:formId/questions', getQuestionsByForm);

export default router;
