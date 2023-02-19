import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { WorkComponent } from './work/work.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'work',
    component: WorkComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'user',
    loadChildren: () => import('../user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'company',
    loadChildren: () =>
      import('../company/company.module').then((m) => m.CompanyModule),
  },
  {
    path: 'message',
    loadChildren: () =>
      import('../message/message.module').then((m) => m.MessageModule),
  },
];
