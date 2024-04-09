import { body } from 'express-validator';

const roleRules = [
    body('nom')
    .notEmpty()
    .withMessage('Le nom ne peut pas être vide')
];

export default roleRules;