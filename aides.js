//importer le model de votre table
import Aide from "../models/Aide.js";

//La liste des aides

export const listeAides = async(req,res)=>{
     try {
        const aide = await Aide.findAll()
        res.status(200).json({data:aide})
        
    } catch (error) {
        res.status(500).json({message:'Erreur lors de la récupération des aides'})
    }
}
//ajout une aide

export const ajouterAide = async (req,res) =>{
    //récuperation des données envoyés par la forme (aide)
   const{categorie,questions,dateCreation}= req.body

   //créer un objet aide
   const nouvelleAide = {categorie,questions,dateCreation}
   try {
    const resultat = await Aide.create(nouvelleAide)
    res.status(201).json({data:resultat, message:"Aide ajouté avec succés"})
    
   } catch (error) {
    res.status(400).json({message:error.message})
   }
}

//information d'un aide
export const detailAide = async(req,res)=>{
    //récupérer id du aide
    const{ id } =req.params
    if(!parseInt(id)) return res.status(404).json({message:"id est obligatoire"})
    try {
        const resultat = await Aide.findByPk(id)
        if(!resultat){
             return res.status(404).json({message:"cette aide n'existe pas"})
            }
    res.status(200).json({data:resultat})
    } catch (error) {
        res.status(400).json({message:error.message})
        
    }

}

export const updateAide = async(req,res)=>{
    try {
        const aide = await Aide.findByIdAndUpdate(req.params.id, {
          categorie: req.body.categorie,
          questions: req.body.questions,
          dateCreation:req.body.dateCreation
          
          
        });
        if (!aide) {
          return res.status(404).json({ message: 'aide non trouvé' });
        }
        res.status(200).json(aide);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de aide' });
      }
}


  export const supprimerAide= async (req, res) => {
    const { id } = req.params
    if (!id) res.status(404).json({ error: true, message: "L'id est requis" })
    try {
        const result = await Aide.destroy({ where: { id } })
        res.status(200).json({ message: `La demande d'Aide ' ${id} a ete supprime avec succes` })
    } catch (error) {
        res.status(404).json({ error: true, message: error.message })
    }
}
  