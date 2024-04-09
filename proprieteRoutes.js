import { Router } from "express";

import {ajouterUnePropriete , listeDesPropriete , updatePropriete, detailDUnePropriete, supprimerPropriete } from "../controllers/propriete.js";

import proprieteRules from '../validation/validationPropriete.js'
import { verifierToken, isAdmin , isProprietaire, isUtilisateur, isVisiteur } from '../authentification/autorisations.js'

import passport from 'passport'

const router = Router()

router
    .get('/',listeDesPropriete )

    .post('/', proprieteRules,passport.authenticate('jwt', { session: false }),ajouterUnePropriete)

    .get('/:id', detailDUnePropriete)

    .put('/:id', passport.authenticate('jwt', { session: false }), updatePropriete)
 
    .delete('/:id',passport.authenticate('jwt', { session: false }), supprimerPropriete)

export default router