import { Router } from "express";
import { ajouterUnRole, listesDesRoles , supprimerRole, updateRole, detailDUnRole,createRoleUser,getRoleUser } from "../controllers/role.js";
import passport from 'passport'


import roleRules from '../validation/validationRole.js'
import { verifierToken, isAdmin , isProprietaire, isUtilisateur, isVisiteur } from '../authentification/autorisations.js'


const router = Router()

router
    .get('/',listesDesRoles)
    .post('/',roleRules, ajouterUnRole)
    .get('/:id',detailDUnRole)
    .get('/:id/utilisateur', getRoleUser)
    .post('/:id/utilisateur',createRoleUser)
    .put('/:id', passport.authenticate('jwt', { session: false }), verifierToken, updateRole)
    .delete('/:id', supprimerRole)

export default router