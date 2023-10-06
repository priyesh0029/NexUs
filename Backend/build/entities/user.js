"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const user = (name, username, number, email, password) => {
    return {
        getName: () => name,
        getUsername: () => username,
        getNumber: () => number,
        getEmail: () => email,
        getPassword: () => password,
    };
};
exports.user = user;
