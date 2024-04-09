import { Router } from "express";

import { ajouterUneEvaluation, listeDesEvaluation, updateEvaluation, detailEvaluation, supprimerEvaluation }  from "../controllers/evaluation.js";

import evaluationRules from '../validation/validationEvaluation.js'
import passport from 'passport'


import { verifierToken, isAdmin , isProprietaire, isUtilisateur, isVisiteur } from '../authentification/autorisations.js'
const router = Router()

router

.get('/', listeDesEvaluation)
.post('/',evaluationRules,passport.authenticate('jwt', { session: false }),ajouterUneEvaluation)
.get('/:id', detailEvaluation)
.put('/:id', passport.authenticate('jwt', { session: false }), updateEvaluation)
.delete('/:id',passport.authenticate('jwt', { session: false }),supprimerEvaluation)

export default router  