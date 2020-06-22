import { Injectable } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

@Injectable()
export class LoadingProvider {

  loading: any;

  constructor(
    private platform: Platform,
    private spinnerDialog: SpinnerDialog,
    private loadingCtrl: LoadingController
  ) { }

  showLoading(duration: number = 60000) {

    if (this.platform.is('cordova')) {
      return this.spinnerDialog.show();
    }

    if (!this.loading) {
      this.loading = this.loadingCtrl.create({
        cssClass: 'app-loading',
        duration: duration
      });

      this.loading.present();
    }

  }

  stopLoading() {

    if (this.platform.is('cordova')) {
      return this.spinnerDialog.hide();
    }

    if (this.loading) {
      this.loading.dismiss();
    }

    this.loading = null;
  }

}
