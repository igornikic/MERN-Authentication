import { encryptTransform } from "redux-persist-transform-encrypt";

const createServerEncryptor = () => {
  // Get the encryption key from the environment variables
  const secretKey = import.meta.env.VITE_ENCRYPTION_KEY;
  // Create encryptor using the secret key and handle encryption errors
  const encryptor = encryptTransform({
    secretKey,
    onError: function (error) {
      console.log("Encryption Error", error);
    },
  });
  return encryptor;
};

export default createServerEncryptor;
