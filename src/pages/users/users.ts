import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  results: any[] = [];
  page = 0;
  limit = 25;
  currentLimit = this.limit;

  constructor(
    private apiProvider: ApiProvider,
    private loadingProvider: LoadingProvider
  ) {
  }

  ionViewDidLoad() {
    this.getUsers();
  }

  getUsers() {

    this.loadingProvider.showLoading();

    this.apiProvider.getUser().subscribe((res: any) => {
      this.loadingProvider.stopLoading();
      console.log(res);
      this.results = res.results;
    }, () => {
      this.loadingProvider.stopLoading();
    });

  }

  doRefresh(refresher: any) {
    this.page = 1;
    this.currentLimit = this.limit;
    this.results = [];
    this.getUsers();
    setTimeout(() => {
      refresher.complete();
    }, 1500);
  }

  doInfinite(infiniteScroll: any) {
    if (this.results.length > this.limit) {
      this.page++;
      this.currentLimit = this.page * this.limit;
    }
    infiniteScroll.complete();
  }
}
