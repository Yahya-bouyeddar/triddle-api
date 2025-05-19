import express from 'express';
import { createForm,  getAllForms, getFormAnalytics, getFormById,getFormByPublicUrl } from '../controllers/form.controller.js';
import protect from '../middleware/protect.js';

const router = express.Router();

// 🟢 Créer un formulaire
router.post('/',protect, createForm);

// 🟢 Obtenir tous les formulaires (optionnel)
router.get('/',protect, getAllForms);

// 🟢 Obtenir un formulaire par son ID
router.get('/id/:id', getFormById); //Ajouter avant "/:id"
router.get('/url/:link', getFormByPublicUrl); //Ajouter avant "/:id"

// 🟢 Obtenir les statistiques (analytics) d’un formulaire
router.get('/:id/analytics', getFormAnalytics);

export default router;
