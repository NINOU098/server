//importer le model de votre table
import Propriete from "../models/Propriete.js";

//La liste des Propriete

export const listeDesPropriete = async(req,res)=>{
    try {
       const proprietes = await Propriete.findAll()
       res.status(200).json({data:proprietes})
       
   } catch (error) {
       res.status(404).json({error : true,message:'Erreur lors de la récupération des Proprietes'})
   }
}



export const ajouterUnePropriete  = async (req,res) =>{
   const { adresse,description,prix,disponibilite,type} = req.body
   const nouvellePropriete = { adresse,description,prix,disponibilite,type}

   try {
    const result = await Propriete.create(nouvellePropriete)
    res.status(201).json({ data: result, message: 'Propriété créer avec succes' })
} catch (error) {
     res.status(400).json({ message: error.message });
   }
 }


 export const detailDUnePropriete  = async(req,res)=>{
   const id = req.params.id;
   if (!id) return res.status(404).json({ message: 'id est obligatoire' })

   try {
     const proprietes  = await Propriete.findByPk(id);
     if (!proprietes) {
       res.status(404).json({ message: "Propriete not found" });
     } else {
       res.status(200).json(proprietes);
     }
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 }


 
export const updatePropriete  = async(req,res)=>{
   const id = req.params.id;
   if (!id) return res.status(404).json({ message: 'id est obligatoire' })

   const {adresse,description,prix,diponibilite,type } = req.body;
   const updatedPropriete = {adresse,description,prix,diponibilite,type } 

   try {
    const resultat = await Propriete.update(updatedPropriete , { where: { id } })
    //here
    res.status(200).json({ message: 'Propriete modifié', data:resultat })

} catch (error) {
    res.status(400).json({ error: true, message: error.message })
}
}


  
export const supprimerPropriete= async(req,res)=>{
   const id = req.params.id;
   if (!id) return res.status(404).json({ message: 'id est obligatoire' })

   try {
     const proprietes = await Propriete.findByPk(id);
     if (!proprietes) {
       res.status(404).json({ message: "propriete n'est pas trouvée" });
     } else {
       await proprietes.destroy();
       res.status(204).json();
     }
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 
 }
 
