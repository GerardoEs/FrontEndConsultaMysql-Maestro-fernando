import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { map, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _usuario!:Usuario;

  get usuario(){
    return {...this._usuario};
  }
  
  
  constructor(private http:HttpClient) { }

  
  login(email: string, paswoord: string){
    const url:string=`${this.baseUrl}/auth`;
    const body ={email,  paswoord};
    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(resp=>{
        //console.log(resp)
        if(resp.ok){

          //Almacenamos en el local el token
          localStorage.setItem('token',resp.token!)

         
        }
      }
        ),
      map( resp=> resp.ok),
      catchError(err=>of(err.error.msg))
    )
      //el of transforma un valor bolleano  para que lo pueda leer el observable
      //tap no tiene ningun efecto sobre los demas
  }

  validarToken():Observable<boolean>{
    const url:string=`${this.baseUrl}/auth/renew`;   
    const vheaders= new HttpHeaders()
    .set('x-tokenkey',localStorage.getItem('token') || '');
    
    return this.http.get<AuthResponse>(url, {headers:  vheaders})
    .pipe(
      map( resp=>{
        localStorage.setItem('token',resp.token!)

        this._usuario= {
          name: resp.name!,
          email: resp.email!,
          uid: resp.uid!
        }
        return resp.ok
      }),
      catchError(err=>of(false))
    )
  }


  logout(){
    localStorage.removeItem('token');
  }

  registro(name:string,email:string,paswoord:string){
    const url:string=`${this.baseUrl}/auth/new`;   
    const body ={name,email,paswoord};

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(resp=>{
        console.log("aut-Servicio-->",resp)
        if(resp.ok){

          //Almacenamos en el local el token
          localStorage.setItem('token',resp.token!)

          
        }
      }
        ),
      map( resp=> resp.ok),
      catchError(err=>of(err.error.msg))
    )


  }
}
