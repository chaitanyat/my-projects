/**
 * Created by chaitanyat on 09-06-2017.
 */

import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component ({
    moduleId: module.id,
    templateUrl: 'user.form.component.html'
})

export class UserFormComponent implements OnInit {
    user: User;

    constructor(private userService: UserService,
                private route: ActivatedRoute,
                private location: Location  ) {

    }

    ngOnInit(): void {
        console.log(this.route.params);
        this.route.params.switchMap((params: Params) => this.userService.getById(params['id'])).subscribe(user => { this.user = user; });
    }
}