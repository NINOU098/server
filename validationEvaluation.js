import { body } from 'express-validator';

const evaluationRules = [
  body('note')
    .notEmpty()
    .withMessage('La note ne peut pas être vide')
    .isNumeric()
    .withMessage('La note doit être un nombre')
    .isInt({ min: 0, max: 5 })
    .withMessage('La note doit être un nombre entier entre 0 et 5'),
  body('commentaire')
    .notEmpty()
    .withMessage('Le commentaire ne peut pas être vide')
    .isLength({ max: 500 })
    .withMessage('Le commentaire doit comporter au maximum 500 caractères'),
  body('date_evaluation')
    .notEmpty()
    .withMessage(" La date d\'évaluation ne peut pas être vide")
    .isInt()
    .withMessage("La date d\'évaluation doit être une date valide au format yyyy-mm-dd. ")
];

export default evaluationRules