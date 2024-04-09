import { body } from 'express-validator';
const reclamationRules = [
  body('type').notEmpty().withMessage('Le type ne peut pas être vide'),
  body('description').notEmpty().withMessage('La description ne peut pas être vide'),
  body('date').notEmpty().withMessage('La date ne peut pas être vide'),
  body('date').isDate({ format: 'YYYY-MM-DD' }).withMessage('La date doit être au format YYYY-MM-DD')
];

export default reclamationRules;