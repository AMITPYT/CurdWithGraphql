// resolvers/productResolver.js
const User = require('../models/user');

const resolvers = {
    Query: {
        users: async () => await User.findAll(),
        user: async (_, { id }) => await User.findByPk(id),
    },
    Mutation: {
        createUser: async (_, { name, email, age }) => {
            return await User.create({ name, email, age });
        },
        updateUser: async (_, { id, name, email, age }) => {
            await User.update({ name, email, age }, { where: { id } });
            return await User.findByPk(id);
        },
        deleteUser: async (_, { id }) => {
            const user = await User.findByPk(id);
            await User.destroy({ where: { id } });
            return user;
        },
    },
};

module.exports = resolvers;
