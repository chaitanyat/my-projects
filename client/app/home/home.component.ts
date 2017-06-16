import { Component, OnInit } from '@angular/core';

import { config } from '../app.config';
import {User} from "../_models/user";

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    currentUser: User;

    constructor() {
        this.currentUser = config.user.data;
    }
}