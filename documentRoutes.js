import { Router } from "express";
import {listeDesDocuments,ajouterUnDocument,detailDUnDocument,updateDocument,supprimerDocument} from "../controllers/document.js";
import passport from 'passport'
import documentRules from '../validation/validationDocument.js'

const router = Router()

import { verifierToken, isAdmin , isProprietaire, isUtilisateur, isVisiteur } from '../authentification/autorisations.js'

router

.get('/',  passport.authenticate('jwt', { session: false }),listeDesDocuments)
   
    .post('/',documentRules,passport.authenticate('jwt', { session: false }),ajouterUnDocument)
    .get('/:id',passport.authenticate('jwt', { session: false }), detailDUnDocument)

    .put('/:id', passport.authenticate('jwt', { session: false }), updateDocument)
    .delete('/:id',passport.authenticate('jwt', { session: false }), supprimerDocument)


export default router