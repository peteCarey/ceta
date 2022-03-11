import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { IUser } from './user';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'https://jsonplaceholder.typicode.com/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getUsers(): Observable<IUser[]> {
    // const users = of(USERS));
    // this.messageService.add('UserService: fetched users');
    return this.http.get<IUser[]>(this.userUrl).pipe(
      tap((_) => this.log('fetched users')),
      catchError(this.handleError<IUser[]>('getUsers', []))
    );
  }

  getUser(id: number): Observable<IUser> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<IUser>(url).pipe(
      tap((_) => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<IUser>(`getUser id=${id}`))
    );
  }

  updateUser(user: IUser): Observable<any> {
    return this.http.put(this.userUrl, user, this.httpOptions).pipe(
      tap((_) => this.log(`updated user id=${user.id}`)),
      // catchError(this.handleError<any>('updateUser'))
      catchError(this.handleError<any>('updateUser'))
    );
  }

  /** POST: add a new user to the server */
  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.userUrl, user, this.httpOptions).pipe(
      tap((newUser: IUser) => this.log(`added user w/ id=${newUser.id}`)),
      catchError(this.handleError<IUser>('addUser'))
    );
  }

  /** DELETE: delete the user from the server */
  deleteUser(id: number): Observable<IUser> {
    const url = `${this.userUrl}/${id}`;

    return this.http.delete<IUser>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<IUser>('deleteUser'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
}
