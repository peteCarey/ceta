import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IUser } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'https://jsonplaceholder.typicode.com/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.userUrl).pipe(
      tap((data) => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  updateUser(user: IUser): Observable<any> {
    return this.http.put(this.userUrl, user, this.httpOptions).pipe(
      tap((_) => console.log(`updated user id=${user.id}`)),
      // catchError(this.handleError<any>('updateUser'))
      catchError(this.handleError)
    );
  }

  /** POST: add a new user to the server */
  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.userUrl, user, this.httpOptions).pipe(
      tap((newUser: IUser) => console.log(`added user w/ id=${newUser.id}`)),
      // catchError(this.handleError<User>('addUser'))
      catchError(this.handleError)
    );
  }

  /** DELETE: delete the user from the server */
  deleteUser(id: number): Observable<IUser> {
    const url = `${this.userUrl}/${id}`;

    return this.http.delete<IUser>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted user id=${id}`)),
      // catchError(this.handleError<User>('deleteUser'))
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error has occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
