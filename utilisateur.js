//importer le model de votre table
import Utilisateur from "../models/Utilisateur.js";
//////////////////////
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
/////////////////////////////////////

// authentification de connexion
export const userLogin = async (req, res) => {
  const { username, password } = req.body
  if (username) {
      try {
          const utilisateur = await Utilisateur.findOne({ where: { username } })
          // console.log("User pass", user, "req pass", password)

          if (!utilisateur) return res.status(404).json({ message: "cet utilisateur n'existe pas" })

          //Verification en comparant les mots de passe
          const verifyPassword = await bcrypt.compare(password, utilisateur.password)

          //Si les mots de passe sont identiques
          if (verifyPassword) {
              let payload = { id: utilisateur.id }
              let token = jwt.sign(payload, process.env.TOKEN_SECRET)
              res.status(200).json({ data: { utilisateur, token } })
          } else {
              res.status(401).json({ message: "Le mot de passe est incorrect" })
          }

      } catch (error) {
          res.status(401).json({ message: error.message })
      }
  }
}

///////////////////// creation des roles pour les utilisateurs
export const createUserRole = async (req, res) => {
  const utilisateurId = req.params.id
  if (!utilisateurId) res.status(404).json({ error: true, message: error.message })

  const { nom } = req.body
  const nouveauRole = { nom }

  try {
      const utilisateurActuel = await Utilisateur.findByPk(utilisateurId)
      const result = await utilisateurActuel.createRole(nouveauRole)
      res.status(201).json({ data: result, message: 'Role ajoute' })
  } catch (error) {
      res.status(400).json({ message: error.message })
  }
}
///////////////////////// afficher le role de lutilisateur
export const getUserRole = async (req, res) => {
  const utilisateurId = req.params.id
  if (!utilisateurId) res.status(404).json({ error: true, message: error.message })


  try {
      const utilisateurActuel = await Utilisateur.findByPk(utilisateurId)
      const result = await utilisateurActuel.getRoles()
      res.status(200).json({ data: result, message: 'Roles retournes' })
  } catch (error) {
      res.status(400).json({ message: error.message })
  }
}


//La liste des utilisateurs

export const listeDesUtilisateurs = async(req,res)=>{
     try {
        const utilisateurs = await Utilisateur.findAll()
        res.status(200).json({data:utilisateurs})
        
    } catch (error) {
        res.status(500).json({message:'Erreur lors de la récupération des utilisateurs'})
    }
}
//ajout un utilisateur

export const ajouterUnUtilisateur = async (req,res) =>{
    //récuperation des données envoyés par la form (utilisateur)
   const{nom,prenom,adresse,naissance,telephone,username,email,password}= req.body

    //hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

   //créer un objet utilisateur
   const nouvelUtilisateur = {nom,prenom,adresse,naissance,telephone,username,email,password:hashedPassword}
   try {

    const resultat = await Utilisateur.create(nouvelUtilisateur)

    res.status(201).json({data:resultat, message:"Utilisateur ajouté avec succés"})
    
   } catch (error) {
    res.status(400).json({message:error.message})
   }
}

//information d'un utilisateur
export const detailDUnUtilisateur = async(req,res)=>{
    //récupérer id d'utilisateur
    const{ id } =req.params
    if(!parseInt(id)) return res.status(404).json({message:"id est obligatoire"})
    try {
        const resultat = await Utilisateur.findByPk(id)
        if(!resultat){
             return res.status(404).json({message:"cet utilisateur n'existe pas"})
            }
    res.status(200).json({data:resultat})
    } catch (error) {
        res.status(400).json({message:error.message})
        
    }

}

export const updateUtilisateur = async(req,res)=>{
    try {
        const utilisateur = await Utilisateur.findByIdAndUpdate(req.params.id, {
          nom: req.body.nom,
          prenom: req.body.prenom,
          adresse:req.body.adresse,
          naissance:req.body.naissance,
          telephone:req.body.telephone,
          username:req.body.username,
          email: req.body.email,
          motDePasse: req.body.motDePasse,
          
        });
        if (!utilisateur) {
          return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(utilisateur);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
      }
}

  export const supprimerUtilisateur = async (req, res) => {
    const { id } = req.params
    if (!id) res.status(404).json({ error: true, message: "L'id est requis" })
    try {
        const result = await Utilisateur.destroy({ where: { id } })
        res.status(200).json({ message: `L'utilisateur' ${id} a ete supprime avec succes` })
    } catch (error) {
        res.status(404).json({ error: true, message: error.message })
    }
}