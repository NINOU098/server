import {  body } from 'express-validator';
const reservationRules = [
    
   
        body('dateReservation')
          .notEmpty()
          .withMessage('La date de réservation est requise')
          .isISO8601()
          .withMessage('La date de réservation doit être une date valide au format ISO'),

        body('dureeReservation')
          .notEmpty()
          .withMessage('La durée de la réservation est requise')
          .isFloat({ min: 0 })
          .withMessage('La durée de la réservation doit être un nombre positif'),
          
        body('prixTotal')
          .notEmpty()
          .withMessage('Le prix total est requis')
          .isFloat({ min: 0 })
          .withMessage('Le prix total doit être un nombre positif'),
      


];

export default reservationRules