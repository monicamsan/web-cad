import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Usuario } from "./usuario.model";
import { Auth } from "../login/auth/auth.model";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl =environment.apiUrl +'/usuario'; 

  constructor(private http: HttpClient) {}

  salvarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  excluirUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  listarTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl + '/all');
  }

  listarPorID(id: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/${id}`);
  }

  login(login: Auth): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/login', login);
  }
}