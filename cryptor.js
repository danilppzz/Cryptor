import { pbkdf2, pbkdf2Sync } from 'crypto';

const cryptor = {
  hash: (string, salt) => {
    return new Promise((resolve, reject) => {
      pbkdf2(string, salt.toString(), 10000, 64, 'sha512', (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString('hex'));
      });
    });
  },

  compare: (string, hashedString, salt) => {
    return new Promise((resolve, reject) => {
      cryptor.hash(string, salt).then(hash => {
        resolve(hash === hashedString);
      }).catch(err => reject(err));
    });
  },

  hashSync: (string, salt) => {
    const derivedKey = pbkdf2Sync(string, salt.toString(), 10000, 64, 'sha512');
    return derivedKey.toString('hex');
  },

  compareSync: (string, hashedString, salt) => {
    const hash = cryptor.hashSync(string, salt);
    return hash === hashedString;
  }
};

export default cryptor;
