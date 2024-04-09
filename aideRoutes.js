import { Router } from "express";
import { ajouterAide, detailAide, listeAides, supprimerAide, updateAide } from "../controllers/aides.js";

import passport from 'passport'

import AideRules from '../validation/validationAide.js'
import { verifierToken, isAdmin , isProprietaire, isUtilisateur, isVisiteur } from '../authentification/autorisations.js'


const router = Router()

router
    .get('/', listeAides)
    .post('/',AideRules, ajouterAide)
    .get('/:id', detailAide)
    .put('/:id', updateAide)
    .delete('/:id',supprimerAide)

export default router