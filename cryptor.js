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

  encrypt: (data, secret) => {
    const algorithm = "aes-256-cbc";
    const key = createHash("sha256").update(secret).digest();
    const iv = randomBytes(16);

    return new Promise((resolve, reject) => {
      try {
        const cipher = createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(data, "utf8", "hex");
        encrypted += cipher.final("hex");
        resolve(`${iv.toString("hex")}:${encrypted}`);
      } catch (error) {
        reject(error);
      }
    });
  },

  decrypt: (data, secret) => {
    const algorithm = "aes-256-cbc";
    const key = createHash("sha256").update(secret).digest();
    const [ivHex, encrypted] = encryptedData.split(":");
    const iv = Buffer.from(ivHex, "hex");

    return new Promise((resolve, reject) => {
      try {
        const decipher = createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encrypted, "hex", "utf8");
        decrypted += decipher.final("utf8");
        resolve(decrypted);
      } catch (error) {
        reject(error);
      }
    });
  },
};

export default cryptor;
