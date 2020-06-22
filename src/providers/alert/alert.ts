import { Injectable } from '@angular/core';
import { AlertController, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AlertProvider {

  constructor(
    private alertCtrl: AlertController,
    private events: Events,
    private translate: TranslateService
  ) { }

  alert(title: string, message: string, button: string, eventsName?: string) {

    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      mode: 'ios',
      buttons: [button]
    });

    alert.present();

    alert.onDidDismiss(() => {
      if (eventsName) {
        this.events.publish(eventsName);
      }
    });

  }

  alertApiError(titleTH: string, titleEN: string, msgTH: string, msgEN: string, eventsName?: string) {

    let title = this.translate.currentLang === 'th' ? titleTH : titleEN;
    let message = this.translate.currentLang === 'th' ? msgTH : msgEN;
    let button = this.translate.currentLang === 'th' ? 'ปิด' : 'Close';

    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      mode: 'ios',
      buttons: [button]
    });

    alert.present();

    alert.onDidDismiss(() => {
      if (eventsName) {
        this.events.publish(eventsName);
      }
    });

  }

  alertSystemError(titleTH: string, titleEN: string, eventsName?: string) {

    const msg = this.translate.currentLang === 'th' ? 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' : 'An error has occurred please try again later.';
    const btn = this.translate.currentLang === 'th' ? 'ปิด' : 'Close';

    let alert = this.alertCtrl.create({
      title: this.translate.currentLang === 'th' ? titleTH : titleEN,
      message: msg,
      mode: 'ios',
      buttons: [btn]
    });

    alert.present();

    alert.onDidDismiss(() => {
      if (eventsName) {
        this.events.publish(eventsName);
      }
    });

  }

}
