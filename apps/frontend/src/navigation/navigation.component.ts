import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { firstValueFrom, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'dontdothis-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    readonly router: Router,
    readonly auth: AuthService,
    private http: HttpClient
  ) {}

  isLoggedIn() {
    return this.auth.user.pipe(map((user) => !!user));
  }

  hasRole(...roles: string[]) {
    return this.auth.user.pipe(
      map((user) => user && roles.includes(user.role))
    );
  }

  async logout() {
    await firstValueFrom(this.http.get('/api/auth/logout'));
    this.auth.refresh();
  }
}
