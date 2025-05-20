import express from 'express';
import { createForm,  getAllForms, getFormAnalytics, getFormById,getFormByPublicUrl } from '../controllers/form.controller.js';
import protect from '../middleware/protect.js';

const router = express.Router();

router.post('/',protect, createForm);

router.get('/',protect, getAllForms);

router.get('/id/:id', getFormById); 

router.get('/url/:link', getFormByPublicUrl); 

router.get('/:id/analytics', getFormAnalytics);

export default router;
