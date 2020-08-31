const Sequelize = require('sequelize');
const sequelize = new Sequelize('workoutserver','postgres', '1234Password',{
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function(){
        console.log('Connected to workout logs postgres database');
    },
    function(err){
        console.log(err);
    }
);
module.exports = sequelize;