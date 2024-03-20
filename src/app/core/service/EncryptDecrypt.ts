import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class encryptDecrypt {


  private secretKey = '212ad106-c1f3-41b0-bd0f-63bc8cd67547##1710396190171'; 
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
        console.log("decryptedData from service", decryptedData);
        return decryptedData;
    } catch (error) {
        console.error("Error during decryption:", error);
        return null; 
    }
}


}
