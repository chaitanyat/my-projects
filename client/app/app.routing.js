"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var index_1 = require("./home/index");
var users_component_1 = require("./user/users.component");
var user_form_component_1 = require("./user/user.form.component");
var index_2 = require("./login/index");
var index_3 = require("./register/index");
var index_4 = require("./_guards/index");
var appRoutes = [
    { path: '', redirectTo: '/home/users', pathMatch: 'full' },
    { path: 'home', component: index_1.HomeComponent, canActivate: [index_4.AuthGuard],
        children: [
            { path: 'users', component: users_component_1.UsersComponent },
            { path: 'users/:id', component: user_form_component_1.UserFormComponent },
        ] },
    { path: 'login', component: index_2.LoginComponent },
    { path: 'register', component: index_3.RegisterComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map