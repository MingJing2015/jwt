import { Component }      from '@angular/core';
import {  MyRemoteService } from './app.myremoteservice';

export class UserModel {
    Email:string;
    UserName:string;
    Password:string;
    ConfirmPassword:string;
    FirstName:string;
    LastName:string;
}

export class LoginModel {
    username:string;
    password:string;
    grant_type:string;

    constructor() {
        this.grant_type = 'password';
    }
}

export class ChangePasswordModel {
     OldPassword:string;
     NewPassword:string;
     ConfirmPassword:string;
     authToken:string;
}

// This component consumes the re-usable service.
@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    // Providers allow us to inject an object instance through the constructor.
    providers: [MyRemoteService]
})
export class AppComponent {
    userModel:UserModel;
    remoteService: MyRemoteService;

    // register variables.
    token: string;
    registerResponse: string;

    // login variables.
    username:string;
    password:string;
    grant_type:string;
    loginResponse;
    authToken:string;

    // password change variables.
    ch_oldPwd:string;
    ch_newPwd:string;
    ch_confirmPassword:string;
    bulkPasswordChangeResponse:string;

    // all users variables.
    allUsersBulkResponse:string;

    // Since using a provider above we can receive service.
    constructor(_remoteService: MyRemoteService) {
        this.userModel = new UserModel();
        this.remoteService = _remoteService;
    }

    getUserByName(userName) {
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
    }

    getUsers() {
        this.remoteService.getUsers(this.authToken)
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
    }

    changePassword() {
        let pwdChangeModel = new ChangePasswordModel();
        pwdChangeModel.ConfirmPassword = this.ch_confirmPassword;
        pwdChangeModel.NewPassword = this.ch_newPwd;
        pwdChangeModel.OldPassword = this.ch_oldPwd;
        pwdChangeModel.authToken = this.authToken;

        this.remoteService.changePassword(pwdChangeModel)
        // Subscribe to observable.
        .subscribe(

        // Success.
        data => {
         //   this.loginResponse = this.convertObjectToString(data);
            console.log(data);
            this.bulkPasswordChangeResponse = this.convertObjectToString(data);
        },
        // Error.
        error => {
            alert(error)
        },
        // Final instructions.
        () => {
            console.log("Finished")
        });
    }

    login() {
        let loginModel = new LoginModel();
        loginModel.password = this.password;
        loginModel.username = this.username;
        
        this.remoteService.login(loginModel)
                // Subscribe to observable.
                .subscribe(

                // Success.
                data => {
                    this.loginResponse = this.convertObjectToString(data);
                    console.log(data);
                    this.authToken = data["access_token"];
                },
                // Error.
                error => {
                    alert(error)
                },
                // Final instructions.
                () => {
                    console.log("Finished")
                });
        }
    
    convertObjectToString (obj) {
        var str = '';
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str += p + '::' + obj[p] + ' *** ';
            }
        }
        return str;
    }

    registerUser() {  
        this.remoteService.createUser(this.userModel)
            // Subscribe to observable.
            .subscribe(

            // Success.
            data => {
                this.token    = data["id"];
                this.registerResponse = this.convertObjectToString(data);
                console.log(data)
            },
            // Error.
            error => {
                alert(error)
            },
            // Final instructions.
            () => {
                console.log("Finished")
            });
    }
}