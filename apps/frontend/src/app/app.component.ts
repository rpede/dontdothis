import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'dontdothis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  readonly message = this.http
    .get<{ message: string }>('/api')
    .pipe(map((x) => x.message));
  constructor(private readonly http: HttpClient) {}
}
