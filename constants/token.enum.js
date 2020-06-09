module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'everest',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refreshEverest',
    JWT_SECRET_TIME: process.env.JWT_SECRET_TIME || '5m',
    JWT_REFRESH_SECRET_TIME: process.env.JWT_REFRESH_SECRET_TIME || '10m'
};

