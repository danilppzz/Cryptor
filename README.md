<div class="logo" align="center">
  <img width="25%" src="https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png" alt="bloons-logo">
  <br>
</div>
<div align="center">
    <h1>Cryptor</h1>
    <img src="https://img.shields.io/github/license/danilppzz/Cryptor">
    <img src="https://img.shields.io/github/issues/danilppzz/Cryptor">
    <img src="https://img.shields.io/github/checks-status/danilppzz/Cryptor/main">
</div>

# Description

`cryptor` is a Node.js library for securely hashing and comparing passwords. It utilizes the PBKDF2 algorithm with salt to ensure even identical passwords are hashed uniquely. The library provides both asynchronous and synchronous methods for hashing and comparing passwords, and manages salts by including them in the stored hash.

## Installation

You can install `cryptor` from npm:

```bash
npm install cryptor
```

## Usage

Importing the Library

```js
import cryptor from 'cryptor';
```

Generating a Salt
```js
const salt = cryptor.generateSalt();
console.log(salt);
```
```env
OUTPUT = e4d909c290d0fb1ca068ffaddf22cbd0
```

### Hashing a Password

Asynchronously
```js
const password = 'mySecretPassword';
const salt = cryptor.generateSalt();

cryptor.hash(password, salt).then(hashedString => {
  console.log('Hashed String:', hashedString);
}).catch(err => {
  console.error('Error hashing string:', err);
});
```
```env
OUTPUT = somesalt$somehashedvalue
```

Synchronously
```js
const password = 'mySecretPassword';
const salt = cryptor.generateSalt();

const hashedStringSync = cryptor.hashSync(password, salt);
console.log('Hashed String Sync:', hashedStringSync);
```
```env
OUTPUT = somesalt$somehashedvalue
```

### Comparing a Password with a Stored Hash

Asynchronously
```js
const hashedString = 'storedSalt$storedHash';

cryptor.compare('mySecretPassword', hashedString).then(isMatch => {
  console.log('Do they match?', isMatch); 
  // true or false
}).catch(err => {
  console.error('Error comparing string:', err);
});
```

Synchronously
```js
const hashedStringSync = 'storedSalt$storedHash';

const isMatchSync = cryptor.compareSync('mySecretPassword', hashedStringSync);
console.log('Do they match? (Sync)', isMatchSync); 
// true or false
```

---

## Crypto Wiki

### `generateSalt(length = 16)`

Generates a random salt.

- `length` (optional): The length of the salt in bytes. Default is 16.

- Returns: The generated salt in hexadecimal format.

### `hash(string, salt, iterations = 10000, keyLength = 64, digest = 'sha512')`

Hashes a string asynchronously.

- `string`: The string to hash.

- `salt`: The salt to use for hashing.

- `iterations` (optional): The number of iterations. Default is 10000.

- `keyLength` (optional): The length of the derived key. Default is 64.

- `digest` (optional): The hash algorithm. Default is 'sha512'.

- Returns: A promise that resolves with the hashed string in the format `salt$hash`.

### `compare(string, hashedString, iterations = 10000, keyLength = 64, digest = 'sha512')`

Compares a string with a stored hash asynchronously.

- `string`: The string to compare.

- `hashedString`: The stored hash in the format salt$hash.

- `iterations` (optional): The number of iterations. Default is 10000.

- `keyLength` (optional): The length of the derived key. Default is 64.

- `digest` (optional): The hash algorithm. Default is 'sha512'.

- Returns: A promise that resolves with true if the strings match, or false otherwise.

### `hashSync(string, salt, iterations = 10000, keyLength = 64, digest = 'sha512')`

Hashes a string synchronously.

- `string`: The string to hash.

- `salt`: The salt to use for hashing.

- `iterations` (optional): The number of iterations. Default is 10000.

- `keyLength` (optional): The length of the derived key. Default is 64.

- `digest` (optional): The hash algorithm. Default is 'sha512'.

- Returns: The hashed string in the format `salt$hash`.

### `compareSync(string, hashedString, iterations = 10000, keyLength = 64, digest = 'sha512')`

Compares a string with a stored hash synchronously.

- `string`: The string to compare.

- `hashedString`: The stored hash in the format salt$hash.
- `iterations` (optional): The number of iterations. Default is 10000.

- `keyLength` (optional): The length of the derived key. Default is 64.

- `digest` (optional): The hash algorithm. Default is 'sha512'.

- Returns: true if the strings match, or false otherwise.
