const db = require('../database').getInstance();
const {modelNamesEnum:{USER}} = require('../constants');

module.exports = {
    create: (user) => {
        const UserModel = db.getModels(USER);
        return  UserModel.create(user)
    },
    getAll: () => {
        const UserModel = db.getModels(USER);
        return UserModel.findAll();
    },
    getOne: (id)=>{
        const UserModel = db.getModels(USER);
        return UserModel.findByPk(id)
    },
    delete: (id)=>{
        const UserModel = db.getModels(USER);
        return  UserModel.destroy({where: {id}})
    },
    update: (id, user) =>{
        const UserModel = db.getModels(USER);
        return UserModel.update(
            user,
            {where: {id}}
        )
    }
}
