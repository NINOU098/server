import { body } from 'express-validator';

const visiteRules = [

    body('date')
    .notEmpty()
    .withMessage('La date ne peut pas être vide')
    .isDate()
    .withMessage('La date doit être une date valide au format yyyy-mm-dd'),
  body('status')
    .notEmpty()
    .withMessage('Le statut ne peut pas être vide')
];

export default visiteRules;