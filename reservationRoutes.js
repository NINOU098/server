import { Router } from "express";
import {listeDesReservation, ajouterUneReservation, detailDUneReservation, updateReservation, supprimerReservation} from "../controllers/reservation.js";
import { verifierToken, isAdmin , isProprietaire, isUtilisateur, isVisiteur } from '../authentification/autorisations.js'
import reservationRules from '../validation/validationReservation.js'

import passport from 'passport'

const router = Router()

router

.get('/',listeDesReservation )
    .post('/',reservationRules ,passport.authenticate('jwt', { session: false }),ajouterUneReservation )
    .get('/:id',passport.authenticate('jwt', { session: false }), detailDUneReservation) 
    .put('/:id',  passport.authenticate('jwt', { session: false }), updateReservation) 
    .delete('/:id',  passport.authenticate('jwt', { session: false }),supprimerReservation) 



export default router