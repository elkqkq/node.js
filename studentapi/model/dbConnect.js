const dbConfig = require("../config/dbConfig");
const { Sequelize,DataTypes } = require( "sequelize" );

// const Sequilize = new Sequilize();

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false, //if errors in your code will overwrite
    });

    sequelize
    .authenticate()
    //promise
    .then(()=>{
        console.log ('Database Connection has been established successfully.');
    })
    .catch((err)=>{
        console.error('Unable to connect to the database :', err);
    });
    const db = {};
    db.Sequelize=Sequelize;
    db.sequelize= sequelize;

    db.students = require('./studentModel')(sequelize, DataTypes);
    db.course = require("./courseModel")(sequelize, DataTypes) ; 
    db.reg = require("./regModel")(sequelize, DataTypes);
    
    db.sequelize.sync({force:false})
      .then(() => {
      console.log('re-sync done')
      })

module.exports = db;



