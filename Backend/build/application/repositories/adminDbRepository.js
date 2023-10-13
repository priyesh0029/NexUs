"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDbRepository = void 0;
const adminDbRepository = (repository) => {
    const findByProperty = async (params) => await repository.findByProperty(params);
    return {
        findByProperty
    };
};
exports.adminDbRepository = adminDbRepository;
