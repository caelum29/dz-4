const db = require('../database').getInstance();
const {modelNamesEnum: {TOKEN}} = require('../constants');

module.exports = {
    getTokenByParams: async (params) => {
        const TokenModel = db.getModels(TOKEN);
        return TokenModel.findOne({where: params})
    },
    createTokenPair: (tokens) => {
        const TokenModel = db.getModels(TOKEN);
        return TokenModel.create(tokens);
    },
    deleteTokenByParams: (params) => {
        const TokenModel = db.getModels(TOKEN);
        return TokenModel.destroy({where: params});
    }
};
