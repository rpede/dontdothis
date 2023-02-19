import { Routes } from '@angular/router';
import { WorkComponent } from './work/work.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'work',
    component: WorkComponent
  }
];
