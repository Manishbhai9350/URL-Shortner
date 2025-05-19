import bcrypt from 'bcrypt';

const saltRounds = 10;

export const Hash = async (data) => {
    return await bcrypt.hash(data, saltRounds);
};

export const Compare = async (data, hashed) => {
    return await bcrypt.compare(data, hashed);
};
