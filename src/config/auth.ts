export default {
  jwt: {
    privateKey: process.env.AUTH_PRIVATE_KEY as string,
    expiresIn: process.env.AUTH_EXPIRES_IN as string,
  },
};
