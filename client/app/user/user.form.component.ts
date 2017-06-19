/**
 * Created by chaitanyat on 09-06-2017.
 */

import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { User } from '../_models/User';
import { UserService } from '../_services/index';

@Component ({
    moduleId: module.id,
    templateUrl: 'user.form.component.html'
})

export class UserFormComponent implements OnInit {
    user: User;
    selected_user_id: string;

    constructor(private userService: UserService,
                private route: ActivatedRoute,
                private location: Location  ) {
        this.user = new User();
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.selected_user_id = params['id'];
        });
        if(this.selected_user_id !== 'create') {
            this.userService.getById(+this.selected_user_id).subscribe(user => {this.user = user});
        }
    }
    selectedUser(user_id: string): string {
        return user_id;
    }

    submitUser(): void {
        console.log(this.user);
        if(this.user.user_id) {
            this.userService.update(this.user).subscribe(response => { console.log(response); });
        } else {
            this.userService.create(this.user).subscribe(response => { console.log(response); });
        }
    }
}