import { Routes, RouterModule }  from '@angular/router';
import { Layout } from './layout.component';
import { LoggedInGuard } from '../login/logged-in.guard';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  { path: '', component: Layout, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: () => System.import('../dashboard/dashboard.module'), canActivate: [LoggedInGuard] },
    //{ path: 'profile', loadChildren: () => System.import('../profile/profile.module') },
    { path: 'config', loadChildren: () => System.import('../config/config.module'), canActivate: [LoggedInGuard] },
    { path: 'inbox', loadChildren: () => System.import('../inbox/inbox.module') },
    { path: 'notifications', loadChildren: () => System.import('../detail-notifications/detail-notifications.module'), canActivate: [LoggedInGuard] },
    { path: 'privileges', loadChildren: () => System.import('../privileges/privileges.module'), canActivate: [LoggedInGuard] },
    { path: 'roles', loadChildren: () => System.import('../roles/roles.module'), canActivate: [LoggedInGuard] },
    { path: 'users', loadChildren: () => System.import('../users/users.module'), canActivate: [LoggedInGuard] },
    { path: 'dealers', loadChildren: () => System.import('../dealers/dealers.module'), canActivate: [LoggedInGuard] },
    { path: 'viabilities', loadChildren: () => System.import('../viabilities/viabilities.module'), canActivate: [LoggedInGuard] },
    { path: 'credits', loadChildren: () => System.import('../credits/credits.module'), canActivate: [LoggedInGuard] },
    /* 
    { path: 'charts', loadChildren: () => System.import('../charts/charts.module') },
    { path: 'profile', loadChildren: () => System.import('../profile/profile.module') },
    { path: 'forms', loadChildren: () => System.import('../forms/forms.module') },
    { path: 'ui', loadChildren: () => System.import('../ui-elements/ui-elements.module') },
    { path: 'extra', loadChildren: () => System.import('../extra/extra.module') },
    { path: 'tables', loadChildren: () => System.import('../tables/tables.module') },
    { path: 'maps', loadChildren: () => System.import('../maps/maps.module') },
    { path: 'grid', loadChildren: () => System.import('../grid/grid.module') },
    { path: 'charts', loadChildren: () => System.import('../charts/charts.module') },
    { path: 'widgets', loadChildren: () => System.import('../widgets/widgets.module') }, 
    */
  ]}
];

export const ROUTES = RouterModule.forChild(routes);
