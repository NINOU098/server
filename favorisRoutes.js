import { Router } from "express";
import { ajouterFavoris, listeDesFavoris , supprimerFavoris } from "../controllers/favoris.js";

import passport from 'passport'

import favorisRules from '../validation/validationFavoris.js'
import { verifierToken, isAdmin , isProprietaire, isUtilisateur, isVisiteur } from '../authentification/autorisations.js'


const router = Router()

router
    .get('/',passport.authenticate('jwt', { session: false }),listeDesFavoris)
    .post('/',favorisRules,passport.authenticate('jwt', { session: false }), ajouterFavoris)   
    .delete('/:id',  passport.authenticate('jwt', { session: false }),supprimerFavoris) 

export default router