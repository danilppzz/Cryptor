import { pbkdf2, pbkdf2Sync, randomBytes } from "crypto";

const cryptor = {
  generateSalt: (length = 16) => {
    return randomBytes(length).toString("hex");
  },

  hash: (string, salt, iterations = 10000, keyLength = 64, digest = "sha512") => {
    return new Promise((resolve, reject) => {
      pbkdf2(string, salt, iterations, keyLength, digest, (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString("hex"));
      });
    });
  },

  compare: (string, hashedString, salt, iterations = 10000, keyLength = 64, digest = "sha512") => {
    return new Promise((resolve, reject) => {
      cryptor
        .hash(string, salt, iterations, keyLength, digest)
        .then((hash) => {
          resolve(hash === hashedString);
        })
        .catch((err) => reject(err));
    });
  },

  hashSync: (string, salt, iterations = 10000, keyLength = 64, digest = "sha512") => {
    const derivedKey = pbkdf2Sync(string, salt, iterations, keyLength, digest);
    return derivedKey.toString("hex");
  },

  compareSync: (
    string,
    hashedString,
    salt,
    iterations = 10000,
    keyLength = 64,
    digest = "sha512"
  ) => {
    const hash = cryptor.hashSync(string, salt, iterations, keyLength, digest);
    return hash === hashedString;
  },
};

export default cryptor;
