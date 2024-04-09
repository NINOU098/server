//importer le model de votre table
import Favoris from "../models/Favoris.js";

//La liste des favoris

export const listeDesFavoris = async(req,res)=>{
    try {
       const favoris = await Favoris.findAll()
       res.status(200).json({data:favoris})
       
   } catch (error) {
       res.status(404).json({error : true,message:'Erreur lors de la récupération des Favoris'})
   }
}

export const ajouterFavoris  = async (req,res) =>{
   const { adresse} = req.body
   const nouveauFavoris = { adresse}
   try {
    const resultat = await Favoris.create(nouveauFavoris)
    res.status(201).json({ data: resultat, message: 'favoris créer avec succes' })
} catch (error) {
     res.status(400).json({ message: error.message });
   }
 }


 
 export const supprimerFavoris = async (req, res) => {
  const { id } = req.params
  if (!id) res.status(404).json({ error: true, message: "L'id est requis" })
  try {
      const result = await  Favoris.destroy({ where: { id } })
      res.status(200).json({ message: `Favoris' ${id} a ete supprime avec succes` })
  } catch (error) {
      res.status(404).json({ error: true, message: error.message })
  }
}
 
