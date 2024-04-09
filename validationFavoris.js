import {  body } from 'express-validator';

const favorisRules = [
  
  body('adresse')
    .notEmpty()
    .withMessage('L\'adresse ne peut pas être vide'),
  
];

export default favorisRules;
