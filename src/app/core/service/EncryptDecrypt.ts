import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})

export class encryptDecrypt {


  private secretKey =this.generateSecretKey(); 
  constructor() { }

  encrypt(data: string | number): string {
    try {
      const encryptedData = CryptoJS.AES.encrypt(data.toString(), this.secretKey).toString();
      return encryptedData;
    } catch (error) {
      console.error('Encryption failed:', error);
      return '';
    }
  }

  decrypt(ciphertext: string): any {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedData;
    } catch (error) {
        console.error("Error during decryption:", error);
        return null; 
    }
}

 generateSecretKey(): string {
  const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-#';
  const length: number = 40;
  const charactersLength: number = characters.length;
  let randomString: string = '';
  const randomArray: string[] = new Array(length);
  
  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * charactersLength);
    randomArray[i] = characters.charAt(randomIndex);
  }
  
  randomString = randomArray.join('');
  return randomString;
}


}
