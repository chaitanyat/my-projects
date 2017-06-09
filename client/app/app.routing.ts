import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { UsersComponent } from './user/users.component';
import { UserFormComponent } from './user/user.form.component';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
	{ path: '', redirectTo: '/home/users', pathMatch: 'full'},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard],
        children:[
            { path: 'users', component: UsersComponent },
            { path: 'users/:id', component: UserFormComponent },
        ] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);