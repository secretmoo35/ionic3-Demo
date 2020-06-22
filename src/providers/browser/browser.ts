
import { Injectable } from '@angular/core';
import { BrowserTab } from '@ionic-native/browser-tab';

@Injectable()
export class BrowserProvider {

  constructor(
    private browserTab: BrowserTab
  ) {

  }

  openBrowser(URL: string) {

    URL = URL.trim();

    if (!URL) {
      return;
    }

    this.openBrowserTab(URL);
  }

  openBrowserTab(URL: any) {
    console.log(URL);
    this.browserTab.isAvailable().then((isAvailable: any) => {
      if (isAvailable) {
        this.browserTab.openUrl(URL);
      } else {
        window.open(URL, '_system');
      }
    });
  }

}
