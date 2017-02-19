import { Injectable }     from '@angular/core';
import { Component }      from '@angular/core';
import {URLSearchParams, QueryEncoder} from '@angular/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; 

export class PwdChangeStatusModel {
    _body:string;
    status:number;
    statusText:string;
}

@Injectable()
export class MyRemoteService {
    public site:string;
    constructor(private http: Http) { 

       //this.site = "http://localhost:50554/"
       //this.site = "http://www.mingjing2637.com/jwt/"

       this.site = "http://jwt20170218.azurewebsites.net/"


    }

    getUsers(token) {
        let url  = this.site + 'api/accounts/users';

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token}); 
        let options = new RequestOptions({ headers: headers });      

        return this.http.get(url, options)
            .map(this.extractData) 
            .catch(this.handleError);         
    }

    changePassword(pwdChangeModel:Object): Observable<Comment[]> {
        let url  = this.site + 'api/accounts/changepassword';

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + pwdChangeModel['authToken']}); 
        let options = new RequestOptions({ headers: headers });
        let params: URLSearchParams = new URLSearchParams();

        let content = new URLSearchParams();
        content.set('OldPassword', pwdChangeModel['OldPassword']);
        content.set('NewPassword', pwdChangeModel['NewPassword']);   
        content.set('ConfirmPassword', pwdChangeModel['ConfirmPassword']);    

        return this.http.post(url, content.toString(), options)
            .map(this.parsePwdChangeData) 
            .catch(this.handleError); 
    }

    login(loginModel:Object): Observable<Comment[]> {
        let url     = this.site + 'oauth/token';
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); 
        let options = new RequestOptions({ headers: headers });
        let params: URLSearchParams = new URLSearchParams();

        let content = new URLSearchParams();
        content.set('password', loginModel['password']);
        content.set('username', loginModel['username']);
        content.set('grant_type', loginModel['grant_type']);
        
        return this.http.post(url, content.toString(), options)
            .map(this.extractData) 
            .catch(this.handleError); 
    }

    createUser(userModel: Object): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); 
        let options = new RequestOptions({ headers: headers });
        let url     = this.site + 'api/accounts/create';

        let params: URLSearchParams = new URLSearchParams();

        let content = new URLSearchParams();
        content.set('Email',  userModel["Email"]);
        content.set('Password', userModel["Password"]);  
        content.set('ConfirmPassword', userModel["ConfirmPassword"]);
        content.set('FirstName', userModel["FirstName"]);
        content.set('LastName', userModel["LastName"]);
        content.set('UserName', userModel["UserName"]);

        return this.http.post(url, content.toString(), options)
            .map(this.extractData) 
            .catch(this.handleError); 
    } 

    // Retreival of JSON from .NET is a success.
    // I had trouble parsing the passwordChange response with extractData so I 
    // created this custom function to do it.
    private parsePwdChangeData(res: Response) {
        let pwdChangeStatus = new PwdChangeStatusModel();
        pwdChangeStatus._body = res["_body"];
        pwdChangeStatus.status = res["status"];
        pwdChangeStatus.statusText = res["statusText"];
        return pwdChangeStatus || {};
    }
    // Retreival of JSON from .NET is a success.
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    // An error occurred. Notify the user.
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }
}