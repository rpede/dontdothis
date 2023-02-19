import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'dontdothis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(auth: AuthService) {
    auth.initialize();
  }
}
