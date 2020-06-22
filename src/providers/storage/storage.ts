import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Platform } from 'ionic-angular';
import { config } from '../../app/app.config';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class StorageProvider {

  secureKey: string = config.storage + '_abc';
  storageName: string = config.storage;

  constructor(
    private nativeStorage: NativeStorage,
    private platform: Platform
  ) { }

  setItem(reference: string, value: any): Promise<any> {

    return new Promise((resolve, reject) => {

      if (!this.platform.is('cordova')) {
        window.localStorage.setItem(`${config.storage}_${reference}`, this.encrypt(JSON.stringify(value)));
        resolve(value);
      } else {
        this.nativeStorage.setItem(`${config.storage}_${reference}`, this.encrypt(value)).then((result: any) => {
          resolve(result);
        }).catch(() => {
          resolve(null);
        });
      }
    });

  }

  getItem(reference: string): Promise<any> {

    return new Promise((resolve, reject) => {

      if (!this.platform.is('cordova')) {
        const value = window.localStorage.getItem(`${config.storage}_${reference}`) ? JSON.parse(this.decrypt(window.localStorage.getItem(`${config.storage}_${reference}`))) : null;
        resolve(value);
      } else {
        this.nativeStorage.getItem(`${config.storage}_${reference}`).then((result: any) => {
          resolve(this.decrypt(result));
        }).catch(() => {
          resolve(null);
        });
      }

    });

  }

  removeItem(reference: string) {
    if (!this.platform.is('cordova')) {
      window.localStorage.removeItem(`${config.storage}_${reference}`);
    }

    this.nativeStorage.remove(`${config.storage}_${reference}`);
  }

  clear() {
    if (!this.platform.is('cordova')) {
      window.localStorage.clear();
    }

    this.nativeStorage.clear();
  }

  encrypt(value: any) {
    return CryptoJS.AES.encrypt(value, this.secureKey).toString();
  }

  decrypt(value: any) {
    return value ? CryptoJS.AES.decrypt(value, this.secureKey).toString(CryptoJS.enc.Utf8) : null;
  }

}
