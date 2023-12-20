import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
        

    constructor(private http: HttpClient) {

    }

    signup(email: string, password: string) {  
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjKn1ZP4VypvhuXgSmhV8a_552_YkybtU',
        {
          email: email,
          password: password,
          returnSecureToken: true   
        }
        ).pipe(catchError(this.handleError), tap(resData => {
           this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        }));
    }

    login(email: string, password: string) {  
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjKn1ZP4VypvhuXgSmhV8a_552_YkybtU', 
        {
          email: email,
          password: password,
          returnSecureToken: true   
        }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
         }));
    }    

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
    };
     
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        console.log(errorRes.error.error);
        if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage);
            }
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'An account for this email already exists!';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'Incorrect email or password! Please check and try again!';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'Incorrect email or password! Please check and try again!';
                    break;
                case 'INVALID_LOGIN_CREDENTIALS':
                    errorMessage = 'Incorrect email or password! Please check and try again!';
                    break;
                default:
                    break;
            }
            
        return throwError(errorMessage);
        
    }
}