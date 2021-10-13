import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoading: BehaviorSubject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) {
    const firebaseConfig = {
      apiKey: 'AIzaSyD3-13wxyUW73M0Wb7M26KiiwYrBwAnvCY',
      authDomain: 'ng-certif.firebaseapp.com',
      projectId: 'ng-certif',
      storageBucket: 'ng-certif.appspot.com',
      messagingSenderId: '631970078174',
      appId: '1:631970078174:web:6e9529e5dd9f3bef68514f',
    };

    const app = initializeApp(firebaseConfig);
  }
}
