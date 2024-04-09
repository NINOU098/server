//Definir les autorisations pour les utilisateurs connectes
import jwt from 'jsonwebtoken'
import { Utilisateur } from '../models/index.js'

//Verifier la presence du token et envoyer l'id de l'utilisateur aux middlewares suivants
export const verifierToken = (req, res, next) => {

    //Extraire le token de la requete
    const bearerToken = req.headers.authorization
    const token = bearerToken.split(' ')[1]

    //Verifier que le token est bien present sinon retourner un message d'erreur
    if (!token) return res.status(403).json({ message: 'Pas autorise a voir ces donnees' })

    //Verifierque le token est bien pour cet utilisateur
    jwt.verify(token, process.env.TOKEN_SECRET, (error, valeurDecode) => {
        if (error) return res.status(401).json({ message: error.message })

        //Mettre l'id de l'utilisateur pour passer aux callbacks suivants
        req.utilisateurId = valeurDecode.id
        next()
    })

}

/////////admin

// Verifier si quelqu'un a le droit admin
export const isAdmin = async (req, res, next) => {

    //Extraire le userId de la requete precedente
    const utilisateurId = req.utilisateurId

    //Retourner ce message si pas de userId
    if (!utilisateurId) return res.status(403).json({ message: "utilisateur innexistant" })

    try {
        const utilisateur = await Utilisateur.findByPk(userId)

        //Si pas de user, retourner ce message
        if (!utilisateur) return res.status(404).json({ message: 'utilisateur innexistant' })

        try {
            //Extraire les roles de l'utilisateur de la base de donnee
            const roles = await utilisateur.getRoles()

            //Si pas de roles, retourner ce message
            if (!roles.length) return res.status(404).json({ message: 'Pas de roles' })

            //Verifier que l'utilisateur est admin
            const hasAdminRight = roles.map(role => role.nom).find(nom => nom.toLowerCase() === 'admin')
            if (hasAdminRight) {
                next()
                return
            }

            //Si l'utilisateur n'est pas admin, envoyer ce message
            return res.status(403).json({ message: 'Doit avoir les droits admin' })

        } catch (error) {
            return res.status(403).json({ message: error.message })
        }

    } catch (error) {
        return res.status(403).json({ message: error.message })

    }
}

////////proprietaire


// Verifier si quelqu'un a le droit admin
export const isProprietaire = async (req, res, next) => {

    //Extraire le userId de la requete precedente
    const utilisateurId = req.utilisateurId

    //Retourner ce message si pas de userId
    if (!utilisateurId) return res.status(403).json({ message: "utilisateur innexistant" })

    try {
        const utilisateur = await Utilisateur.findByPk(userId)

        //Si pas de user, retourner ce message
        if (!utilisateur) return res.status(404).json({ message: 'utilisateur innexistant' })

        try {
            //Extraire les roles de l'utilisateur de la base de donnee
            const roles = await utilisateur.getRoles()

            //Si pas de roles, retourner ce message
            if (!roles.length) return res.status(404).json({ message: 'Pas de roles' })

            //Verifier que l'utilisateur est proprietaire
            const hasPropRight = roles.map(role => role.nom).find(nom => nom.toLowerCase() === 'proprietaire')
            if (hasPropRight) {
                next()
                return
            }

            //Si l'utilisateur n'est pas proprietaire, envoyer ce message
            return res.status(403).json({ message: 'Doit avoir les droits proprietaire' })

        } catch (error) {
            return res.status(403).json({ message: error.message })
        }

    } catch (error) {
        return res.status(403).json({ message: error.message })

    }
}

///////////utilisateur

// Verifier si quelqu'un a le droit utilisateur
export const isUtilisateur = async (req, res, next) => {

    //Extraire le userId de la requete precedente
    const utilisateurId = req.utilisateurId

    //Retourner ce message si pas de userId
    if (!utilisateurId) return res.status(403).json({ message: "utilisateur innexistant" })

    try {
        const utilisateur = await Utilisateur.findByPk(userId)

        //Si pas de user, retourner ce message
        if (!utilisateur) return res.status(404).json({ message: 'utilisateur innexistant' })

        try {
            //Extraire les roles de l'utilisateur de la base de donnee
            const roles = await utilisateur.getRoles()

            //Si pas de roles, retourner ce message
            if (!roles.length) return res.status(404).json({ message: 'Pas de roles' })

            //Verifier que l'utilisateur est inscrit
            const hasuserRight = roles.map(role => role.nom).find(nom => nom.toLowerCase() === 'utilisateur')
            if (hasuserRight) {
                next()
                return
            }

            //Si l'utilisateur n'est pas inscrit, envoyer ce message
            return res.status(403).json({ message: 'Doit avoir les droits utilisateur' })

        } catch (error) {
            return res.status(403).json({ message: error.message })
        }

    } catch (error) {
        return res.status(403).json({ message: error.message })

    }
}


/////////////////visiteur

// Verifier si quelqu'un a le droit admin
export const isVisiteur = async (req, res, next) => {

    //Extraire le userId de la requete precedente
    const utilisateurId = req.utilisateurId

    //Retourner ce message si pas de userId
    if (!utilisateurId) return res.status(403).json({ message: "utilisateur innexistant" })

    try {
        const utilisateur = await Utilisateur.findByPk(userId)

        //Si pas de user, retourner ce message
        if (!utilisateur) return res.status(404).json({ message: 'utilisateur innexistant' })

        try {
            //Extraire les roles de l'utilisateur de la base de donnee
            const roles = await utilisateur.getRoles()

            //Si pas de roles, retourner ce message
            if (!roles.length) return res.status(404).json({ message: 'Pas de roles' })

            //Verifier que l'utilisateur est proprietaire
            const hasVisitRight = roles.map(role => role.nom).find(nom => nom.toLowerCase() === 'visiteur')
            if (hasVisitRight) {
                next()
                return
            }

            //Si l'utilisateur n'est pas proprietaire, envoyer ce message
            return res.status(403).json({ message: 'Doit avoir les droits visiteur' })

        } catch (error) {
            return res.status(403).json({ message: error.message })
        }

    } catch (error) {
        return res.status(403).json({ message: error.message })

    }
}
