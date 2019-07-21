const keys: any = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    TOKEN: {
        KEY: process.env.TOKEN_KEY,
        EXP: process.env.TOKEN_EXP
    }
};

export default keys;
