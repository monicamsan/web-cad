import { Observable } from "rxjs";
import { Perfil } from "./perfil.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = environment.apiUrl +'/perfil'; 

  constructor(private http: HttpClient) {}

  salvarPerfil(perfil: Perfil): Observable<any> {
    return this.http.post<any>(this.apiUrl, perfil);
  }

  excluirPerfil(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  listarTodos(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.apiUrl + '/all');
  }
}