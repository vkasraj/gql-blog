import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import TokenGenerator from "../utils/token.util";

const context = ({ req }: ExpressContext) => {
    const token = req.headers.authorization;

    let USER = null;
    if (token) {
        USER = TokenGenerator.verify(token);
    }

    return {
        USER
    };
};

export default context;
