module.exports = (sequelize, DataTypes) =>{
    const Log = sequelize.define('log', {
        routineName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        routineDescription:{
            type: DataTypes.STRING,
            allowNull: false
        },
        result:{
            type: DataTypes.STRING,
            allowNull: false
        },
        member:{
            type: DataTypes.INTEGER
        }
    })
    return Log;
}