import { Router } from "express";

import { ajouterUnUtilisateur, listeDesUtilisateurs, updateUtilisateur, detailDUnUtilisateur, supprimerUtilisateur, userLogin, createUserRole,getUserRole  } from "../controllers/utilisateur.js";

import utilisateurRules from '../validation/validationUtilisateur.js'
import { verifierToken, isAdmin , isProprietaire, isUtilisateur, isVisiteur } from '../authentification/autorisations.js'

import passport from 'passport'


const router = Router()

router
    .get('/', listeDesUtilisateurs)


    .post('/',utilisateurRules, ajouterUnUtilisateur)  


    .get('/:id',passport.authenticate('jwt', { session: false }), detailDUnUtilisateur)


    .put('/:id', passport.authenticate('jwt', { session: false }), updateUtilisateur )


    .post('/login', userLogin)

    .post('/:id/role', createUserRole)

    .get('/:id/role', getUserRole)

    .delete('/:id', passport.authenticate('jwt', { session: false }),supprimerUtilisateur)

export default router