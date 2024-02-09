import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../usuario/usuario.service';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { SnackbarService } from 'src/app/shared/SnackBarService';
import { Usuario } from '../../usuario/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router,
              private usuarioService : UsuarioService,
              private snackbarService: SnackbarService) {}

 usuario : Usuario = new Usuario();    
 private isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAdmin$: Observable<boolean> = this.isAdminSubject.asObservable();
     

  login(username: string, password: string): void {

    const login = {
      nome : username,
      senha: password
    }
    this.usuarioService.login(login).pipe(
      catchError(error => {
        this.snackbarService.mensagem('Não foi possível realizar o login. Usuário/Senha incorreta');
        throw error; 
      })
    ).subscribe(
      (data: Usuario) => {
        this.usuario = data;  
        this.snackbarService.mensagem('Realizado login');
        const token = 'logado';

        localStorage.setItem('usuario', this.usuario.id.toString());
        localStorage.setItem('admin', this.usuario.perfil.admin ? 'SIM' : 'NÃO');
        localStorage.setItem('token', token);
        this.setIsAdmin(this.usuario.perfil.admin);
        this.router.navigate(['/home']);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('usuario');
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
  }
  
  isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
    }

  isAdmin(): boolean{
    return localStorage.getItem('admin') == 'SIM' ? true : false;
  }
  
  setIsAdmin(isAdmin: boolean): void {
    this.isAdminSubject.next(isAdmin);
  }
  
  getIdUsuarioLogado(): number {
    const usuarioIdString = localStorage.getItem('usuario');

    if (usuarioIdString != undefined){
      const usuarioIdNumero = parseInt(usuarioIdString, 10); 
      if (!isNaN(usuarioIdNumero)) {
         return usuarioIdNumero;
      } else {
        return 0;
      }
    }
    return 0;
  }
}
