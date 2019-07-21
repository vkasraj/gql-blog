const debug = require("debug");

class Debug {
    static get www() {
        return debug("www");
    }
}

module.exports = Debug;
