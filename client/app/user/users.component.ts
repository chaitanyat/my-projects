import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
	moduleId: module.id,
    templateUrl: 'users.component.html'
})

export class UsersComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService) { }

	ngOnInit() {
		this.loadAllUsers();
	}

	private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}