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
var app_myremoteservice_1 = require("./app.myremoteservice");
var UserModel = (function () {
    function UserModel() {
    }
    return UserModel;
}());
exports.UserModel = UserModel;
var LoginModel = (function () {
    function LoginModel() {
        this.grant_type = 'password';
    }
    return LoginModel;
}());
exports.LoginModel = LoginModel;
var ChangePasswordModel = (function () {
    function ChangePasswordModel() {
    }
    return ChangePasswordModel;
}());
exports.ChangePasswordModel = ChangePasswordModel;
// This component consumes the re-usable service.
var AppComponent = (function () {
    // Since using a provider above we can receive service.
    function AppComponent(_remoteService) {
        this.userModel = new UserModel();
        this.remoteService = _remoteService;
    }
    AppComponent.prototype.getUserByName = function (userName) {
        /*
        this.remoteService.getUserByName(this.authToken, userName)
        // Subscribe to observable.
        .subscribe(

        // Success.
        data => {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
               this.allUsersBulkResponse += '***'
               + data[i]['email'];
            }
        },
        // Error.
        error => {
            alert(error)
        },
        // Final instructions.
        () => {
            console.log("Finished")
        });
        */
    };
    AppComponent.prototype.getUsers = function () {
        var _this = this;
        this.remoteService.getUsers(this.authToken)
            .subscribe(
        // Success.
        function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                _this.allUsersBulkResponse += '***'
                    + data[i]['email'];
            }
        }, 
        // Error.
        function (error) {
            alert(error);
        }, 
        // Final instructions.
        function () {
            console.log("Finished");
        });
    };
    AppComponent.prototype.changePassword = function () {
        var _this = this;
        var pwdChangeModel = new ChangePasswordModel();
        pwdChangeModel.ConfirmPassword = this.ch_confirmPassword;
        pwdChangeModel.NewPassword = this.ch_newPwd;
        pwdChangeModel.OldPassword = this.ch_oldPwd;
        pwdChangeModel.authToken = this.authToken;
        this.remoteService.changePassword(pwdChangeModel)
            .subscribe(
        // Success.
        function (data) {
            //   this.loginResponse = this.convertObjectToString(data);
            console.log(data);
            _this.bulkPasswordChangeResponse = _this.convertObjectToString(data);
        }, 
        // Error.
        function (error) {
            alert(error);
        }, 
        // Final instructions.
        function () {
            console.log("Finished");
        });
    };
    AppComponent.prototype.login = function () {
        var _this = this;
        var loginModel = new LoginModel();
        loginModel.password = this.password;
        loginModel.username = this.username;
        this.remoteService.login(loginModel)
            .subscribe(
        // Success.
        function (data) {
            _this.loginResponse = _this.convertObjectToString(data);
            console.log(data);
            _this.authToken = data["access_token"];
        }, 
        // Error.
        function (error) {
            alert(error);
        }, 
        // Final instructions.
        function () {
            console.log("Finished");
        });
    };
    AppComponent.prototype.convertObjectToString = function (obj) {
        var str = '';
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str += p + '::' + obj[p] + ' *** ';
            }
        }
        return str;
    };
    AppComponent.prototype.registerUser = function () {
        var _this = this;
        this.remoteService.createUser(this.userModel)
            .subscribe(
        // Success.
        function (data) {
            _this.token = data["id"];
            _this.registerResponse = _this.convertObjectToString(data);
            console.log(data);
        }, 
        // Error.
        function (error) {
            alert(error);
        }, 
        // Final instructions.
        function () {
            console.log("Finished");
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app/app.component.html',
        // Providers allow us to inject an object instance through the constructor.
        providers: [app_myremoteservice_1.MyRemoteService]
    }),
    __metadata("design:paramtypes", [app_myremoteservice_1.MyRemoteService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map