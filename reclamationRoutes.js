
import { Router } from "express";

import { ajouterUneReclamation, listeDesReclamations, updateReclamation, detailDUneReclamation, supprimerReclamation } from "../controllers/reclamation.js";

import reclamationRules from '../validation/validationReclamation.js'
import { verifierToken, isAdmin , isProprietaire, isUtilisateur, isVisiteur } from '../authentification/autorisations.js'
import passport from 'passport'


const router = Router()

router
    .get('/',passport.authenticate('jwt', { session: false }),listeDesReclamations)
    .post('/',reclamationRules,passport.authenticate('jwt', { session: false }),ajouterUneReclamation)
    .get('/:id',passport.authenticate('jwt', { session: false }),detailDUneReclamation)
    .put('/:id',passport.authenticate('jwt', { session: false }), updateReclamation)
    .delete('/:id', passport.authenticate('jwt', { session: false }), supprimerReclamation)

export default router

