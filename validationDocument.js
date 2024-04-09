import {  body } from 'express-validator';
const documentRules = [
    
    body('nomDocument')
    .notEmpty()
    .withMessage('Le nom du document est requis')
    .isLength({ min: 3, max: 100 })
    .withMessage('Le nom du document doit comporter entre 3 et 100 caractères'),

    body('type')
    .notEmpty()
    .withMessage('Le type de document est requis'),

    body('contenu')
    .notEmpty()
    .withMessage('Le contenu du document est requis')


];

export default documentRules