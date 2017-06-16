"use strict";
/**
 * Created by chaitanyat on 09-06-2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var User_1 = require("../_models/User");
var index_1 = require("../_services/index");
var UserFormComponent = (function () {
    function UserFormComponent(userService, route, location) {
        this.userService = userService;
        this.route = route;
        this.location = location;
        this.user = new User_1.User();
    }
    UserFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.selected_user_id = params['id'];
        });
        if (this.selected_user_id !== 'create') {
            this.userService.getById(+this.selected_user_id).subscribe(function (user) { _this.user = user; });
        }
    };
    UserFormComponent.prototype.selectedUser = function (user_id) {
        return user_id;
    };
    UserFormComponent.prototype.submitUser = function () {
        console.log(this.user);
    };
    return UserFormComponent;
}());
UserFormComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'user.form.component.html'
    }),
    __metadata("design:paramtypes", [index_1.UserService,
        router_1.ActivatedRoute,
        common_1.Location])
], UserFormComponent);
exports.UserFormComponent = UserFormComponent;
//# sourceMappingURL=user.form.component.js.map