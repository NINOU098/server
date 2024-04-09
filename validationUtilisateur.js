import { check, body } from 'express-validator';

const utilisateurRules = [
  body('nom')
    .notEmpty()
    .withMessage('Le nom ne peut pas être vide'),
  body('prenom')
    .notEmpty()
    .withMessage('Le prénom ne peut pas être vide'),
  body('adresse')
    .notEmpty()
    .withMessage('L\'adresse ne peut pas être vide'),
  check('naissance')
    .notEmpty()
    .withMessage('La date de naissance ne peut pas être vide')
    .isDate().withMessage('La date de naissance doit être une date valide au format yyyy-mm-dd.'),
  body('telephone')
    .notEmpty()
    .withMessage('Le téléphone ne peut pas être vide')
    .isMobilePhone('fr-CA')
    .withMessage('Le numéro de téléphone doit être un numéro de téléphone portable valide en France'),
  body('username')
    .notEmpty()
    .withMessage('Le nom d\'utilisateur ne peut pas être vide'),
  body('email')
    .notEmpty()
    .withMessage('L\'e-mail ne peut pas être vide')
    .isEmail()
    .withMessage('L\'e-mail doit être une adresse e-mail valide'),
  body('password')
    .notEmpty()
    .withMessage('Le mot de passe ne peut pas être vide')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit comporter au moins 6 caractères')
];

export default utilisateurRules;
