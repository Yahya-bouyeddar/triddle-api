import express from 'express';
import { getResponsesByForm, submitResponse,  } from '../controllers/response.controller.js';
import protect from '../middleware/protect.js';

const router = express.Router();

// 🟢 Enregistrer une réponse dans un formulaire
router.post('/forms/:formId/responses', submitResponse);

// 🟢 Obtenir toutes les réponses d’un formulaire
router.get('/forms/:formId/responses', getResponsesByForm);

export default router;
