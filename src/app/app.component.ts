import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
import { TranslateService } from '@ngx-translate/core';

import { HomePage } from '../pages/home/home';
import { config } from './app.config';
import { StorageProvider } from '../providers/storage/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private oneSignal: OneSignal,
    private translate: TranslateService,
    private storageProvider: StorageProvider
  ) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.platform.is('cordova')) {
        this.initialOneSignal();
      }
    });
  }


  initialOneSignal() {

    this.oneSignal.startInit(config.oneSignalID, config.firebaseID);
    this.oneSignal.setSubscription(true);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.iOSSettings({ kOSSettingsKeyAutoPrompt: true, kOSSettingsKeyInAppLaunchURL: false });
    this.oneSignal.handleNotificationReceived().subscribe(res => {
      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe((r) => {
      // do something when a notification is opened
      if (
        r &&
        r.notification &&
        r.notification.payload &&
        r.notification.payload.additionalData
      ) {
        let data = r.notification.payload.additionalData;

        if (data) {
          alert(JSON.stringify(data));
          console.log(JSON.stringify(data));
        }
      }
    });

    this.oneSignal.endInit();

  }

  async setLanguage() {
    // Translate
    this.translate.addLangs(['en', 'th']);
    const browserLang = await this.storageProvider.getItem('ln') || 'th';

    this.translate.setDefaultLang(browserLang === 'th' ? 'en' : 'th');
    this.translate.use(browserLang.match(/en|th/) ? browserLang : 'th');

  }

}

