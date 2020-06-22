import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { OneSignal } from '@ionic-native/onesignal';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { BrowserTab } from '@ionic-native/browser-tab';
import { Network } from '@ionic-native/network';
import { NativeStorage } from '@ionic-native/native-storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StorageProvider } from '../providers/storage/storage';
import { AlertProvider } from '../providers/alert/alert';
import { ApiProvider } from '../providers/api/api';
import { LoadingProvider } from '../providers/loading/loading';
import { BrowserProvider } from '../providers/browser/browser';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      preloadModules: true,
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      backButtonIcon: 'ios-arrow-back',
      platforms: {
        ios: {
          backButtonText: '',
        },
        android: {
          backButtonText: '',
        }
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    SpinnerDialog,
    BrowserTab,
    Network,
    NativeStorage,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AlertProvider,
    ApiProvider,
    BrowserProvider,
    LoadingProvider,
    StorageProvider
  ]
})
export class AppModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

