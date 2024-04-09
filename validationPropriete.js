import { body,check } from 'express-validator';

const proprieteRules = [
body('adresse').notEmpty().withMessage('L\'adresse ne peut pas être vide'),
body('description').notEmpty().withMessage('La description ne peut pas être vide'),
body('prix').notEmpty().withMessage('Le prix ne peut pas être vide'),
body('prix').isFloat({ min: 0 }).withMessage('Le prix doit être un nombre positif'),
body('disponibilite').notEmpty().withMessage('La disponibilité ne peut pas être vide'),
check('disponibilite').notEmpty()
.withMessage('La date de naissance ne peut pas être vide')
.isDate().withMessage('La date de naissance doit être une date valide au format yyyy-mm-dd.'),
body('type').notEmpty().withMessage('Le type ne peut pas être vide')
];

export default proprieteRules;