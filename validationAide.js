import { check, body } from 'express-validator';


const AideRules = [
  body('categorie')
    .notEmpty()
    .withMessage('La categortie ne peut pas être vide'),
  body('questions')
    .notEmpty()
    .withMessage('La question ne peut pas être vide'),
  
  check('dateCreation')
    .notEmpty()
    .withMessage('La date de creation ne peut pas être vide')
    .isDate().withMessage('La date de creation doit être une date valide au format yyyy-mm-dd.')
 
];

export default AideRules;
