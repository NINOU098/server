import database from '../connexion.js'

//importer les types de données sequelize
import{DataTypes} from "sequelize"

const aide = database.define('aide',{
    id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true,allowNull: false},
    categorie: { type:DataTypes.STRING,allowNull:false },
    questions: { type:DataTypes.TEXT,allowNull:false },
    dateCreation: { type:DataTypes.DATEONLY,allowNull:false },
    
},
{timestamps:false}
)
export default aide