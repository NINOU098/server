//importer le model de votre table
import Role from "../models/Role.js";

//La liste des Roles

export const listesDesRoles = async(req,res)=>{
    try {
       const roles = await Role.findAll()
       res.status(200).json({data:roles})
       
   } catch (error) {
       res.status(404).json({error : true,message:'Erreur lors de la récupération des Roles'})
   }
}

export const ajouterUnRole = async (req,res) =>{
   const { nom} = req.body
   const nouveauRole = { nom}

   try {

    const resultat = await Role.create(nouveauRole)
 
    res.status(201).json({ data: resultat, message: 'Role créer avec succes' })
} catch (error) {
     res.status(400).json({ message: error.message });
   }
 }


 export const detailDUnRole  = async(req,res)=>{
   const id = req.params.id;
   if (!id) return res.status(404).json({ message: 'id est obligatoire' })

   try {
     const roles  = await Role.findByPk(id);
     if (!roles) {
       res.status(404).json({ message: "Role non trouver" });
     } else {
       res.status(200).json(roles);
     }
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 }


 
export const updateRole  = async(req,res)=>{
   const id = req.params.id;
   if (!id) return res.status(404).json({ message: 'id est obligatoire' })

   const {nom } = req.body;
   const updatedRole = {nom } 

   try {
    const resultat = await Role.update(updatedRole , { where: { id } })
    //here
    res.status(200).json({ message: 'Role modifié', data:resultat })

} catch (error) {
    res.status(400).json({ error: true, message: error.message })
}
}


  
export const supprimerRole= async(req,res)=>{
   const id = req.params.id;
   if (!id) return res.status(404).json({ message: 'id est obligatoire' })

   try {
     const roles = await Role.findByPk(id);
     if (!roles) {
       res.status(404).json({ message: "Role n'est pas trouvée" });
     } else {
       await roles.destroy();
       res.status(204).json();
     }
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 
 }

//////////////////////////////
export const createRoleUser = async (req, res) => {
  const roleId = req.params.id
  if (!roleId) res.status(404).json({ error: true, message: error.message })

  const { nom,prenom,adresse,naissance,telephone,username,email,password} = req.body
  const nouveauRole = { nom,prenom,adresse,naissance,telephone,username,email,password}

  try {
      const roleActuel = await Role.findByPk(roleId)
      const result = await roleActuel.createUtilisateur(nouveauRole)
      res.status(201).json({ data: result, message: 'Utilisateur ajoute' })
  } catch (error) {
      res.status(400).json({ message: error.message })
  }
}

export const getRoleUser = async (req, res) => {
  const roleId = req.params.id
  if (!roleId) res.status(404).json({ error: true, message: error.message })

  try {
      const roleActuel = await Role.findByPk(roleId)
      const result = await roleActuel.getUtilisateurs()
      res.status(200).json({ data: result, message: 'Roles retournes' })
  } catch (error) {
      res.status(400).json({ message: error.message })
  }
}
