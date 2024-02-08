// import {setRandomFallback, genSaltSync, hashSync} from 'bcryptjs';
// export function encrypt(p){
//     setRandomFallback((len) => {
//         const buf = new Uint8Array(len);
//         for (let i = 0; i < len; i++) {
//           buf[i] = Math.floor(Math.random() * 256);
//         }
//         return buf;
//       });
//     const salt = genSaltSync(10);
//     const hash = hashSync(p, salt);
//     console.log(hash);
// }

// encrypt("cs320!")

import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
// Example: Hashing a string using SHA-256
export function AuthFlow(e, p) {
  const hashed = Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA512,
    p
  ).then(h => {
    // console.log('Hashed:', h);
    //Post user and password to the DB HERE!!
    //if true
    SecureStore.setItemAsync("Signed", "Yes").then(r => r).catch(e => console.error(e));
    SecureStore.setItemAsync("email", e).then(r => r).catch(e => console.error(e));
    //else
    //alert and return;
  }).catch(e => console.error(e));
};
