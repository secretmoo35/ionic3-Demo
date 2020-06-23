import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { AlertProvider } from '../../providers/alert/alert';
import { BrowserProvider } from '../../providers/browser/browser';
import { LoadingProvider } from '../../providers/loading/loading';
import { StorageProvider } from '../../providers/storage/storage';
import { config } from '../../app/app.config';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  storage: any;
  storageEncrypt: any;
  msg: string = 'Hello.'
  base64Image: string;

  constructor(
    private navCtrl: NavController,
    private alertProvider: AlertProvider,
    private browserProvider: BrowserProvider,
    private loadingProvider: LoadingProvider,
    private storageProvider: StorageProvider,
    private platform: Platform,
    private nativeStorage: NativeStorage,
    private camera: Camera
  ) {

  }

  alert() {
    this.alertProvider.alert('Alert', `Alert provider it's work.`, 'OK');
  }

  openBrowser() {
    this.browserProvider.openBrowser('https://ionicframework.com/docs/v3/');
  }

  showLoading() {
    this.loadingProvider.showLoading(2000);
  }

  setStorage() {
    this.storageProvider.setItem('obj', {
      name: 'john doe',
      email: 'john@email.com',
      date: new Date
    });
  }

  async getStorage() {
    this.storage = await this.storageProvider.getItem('obj');
  }

  getStorageNodecrypt() {
    if (!this.platform.is('cordova')) {
      const value = window.localStorage.getItem(`${config.storage}_obj`) ? window.localStorage.getItem(`${config.storage}_obj`) : null;
      this.storageEncrypt = value
    } else {
      this.nativeStorage.getItem(`${config.storage}_obj`).then((result: any) => {
        this.storageEncrypt = result
      }).catch(() => {

      });
    }
  }

  getUsers() {
    this.navCtrl.push('UsersPage');
  }

  clickCustomBtn() {
    alert('Hi');
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

}
