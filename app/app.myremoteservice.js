"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var PwdChangeStatusModel = (function () {
    function PwdChangeStatusModel() {
    }
    return PwdChangeStatusModel;
}());
exports.PwdChangeStatusModel = PwdChangeStatusModel;
var MyRemoteService = (function () {
    function MyRemoteService(http) {
        //this.site = "http://localhost:50554/"
        //this.site = "http://www.mingjing2637.com/jwt/"
        this.http = http;
        this.site = "http://jwt20170218.azurewebsites.net/";
    }
    MyRemoteService.prototype.getUsers = function (token) {
        var url = this.site + 'api/accounts/users';
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.get(url, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    MyRemoteService.prototype.changePassword = function (pwdChangeModel) {
        var url = this.site + 'api/accounts/changepassword';
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + pwdChangeModel['authToken'] });
        var options = new http_2.RequestOptions({ headers: headers });
        var params = new http_1.URLSearchParams();
        var content = new http_1.URLSearchParams();
        content.set('OldPassword', pwdChangeModel['OldPassword']);
        content.set('NewPassword', pwdChangeModel['NewPassword']);
        content.set('ConfirmPassword', pwdChangeModel['ConfirmPassword']);
        return this.http.post(url, content.toString(), options)
            .map(this.parsePwdChangeData)
            .catch(this.handleError);
    };
    MyRemoteService.prototype.login = function (loginModel) {
        var url = this.site + 'oauth/token';
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_2.RequestOptions({ headers: headers });
        var params = new http_1.URLSearchParams();
        var content = new http_1.URLSearchParams();
        content.set('password', loginModel['password']);
        content.set('username', loginModel['username']);
        content.set('grant_type', loginModel['grant_type']);
        return this.http.post(url, content.toString(), options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    MyRemoteService.prototype.createUser = function (userModel) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_2.RequestOptions({ headers: headers });
        var url = this.site + 'api/accounts/create';
        var params = new http_1.URLSearchParams();
        var content = new http_1.URLSearchParams();
        content.set('Email', userModel["Email"]);
        content.set('Password', userModel["Password"]);
        content.set('ConfirmPassword', userModel["ConfirmPassword"]);
        content.set('FirstName', userModel["FirstName"]);
        content.set('LastName', userModel["LastName"]);
        content.set('UserName', userModel["UserName"]);
        return this.http.post(url, content.toString(), options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    // Retreival of JSON from .NET is a success.
    // I had trouble parsing the passwordChange response with extractData so I 
    // created this custom function to do it.
    MyRemoteService.prototype.parsePwdChangeData = function (res) {
        var pwdChangeStatus = new PwdChangeStatusModel();
        pwdChangeStatus._body = res["_body"];
        pwdChangeStatus.status = res["status"];
        pwdChangeStatus.statusText = res["statusText"];
        return pwdChangeStatus || {};
    };
    // Retreival of JSON from .NET is a success.
    MyRemoteService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    // An error occurred. Notify the user.
    MyRemoteService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        return Observable_1.Observable.throw(errMsg);
    };
    return MyRemoteService;
}());
MyRemoteService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_2.Http])
], MyRemoteService);
exports.MyRemoteService = MyRemoteService;
//# sourceMappingURL=app.myremoteservice.js.map