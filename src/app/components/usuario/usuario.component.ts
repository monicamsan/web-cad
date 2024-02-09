import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { UsuarioService } from './usuario.service';
import { SnackbarService } from 'src/app/shared/SnackBarService';
import { Observable, catchError, of } from 'rxjs';
import { Usuario } from './usuario.model';
import { PerfilService } from '../perfil/perfil.service';
import { Perfil } from '../perfil/perfil.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../login/auth/auth.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuario: Usuario = new Usuario();
  perfis!: Perfil[];
  usuarios!: Usuario[];
  selectedPerfil: any;
  displayedColumns = ['nome', 'cpf', 'ativo', 'perfil','acoes'];
  dataSource = new MatTableDataSource();
  
  @ViewChild(MatSort) sort!: MatSort;
  isSalvando: boolean = false;
  isAdmin: boolean = false;
  usuarioLogado: any;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(private usuarioService: UsuarioService,
              private snackbarService: SnackbarService,
              private perfilService: PerfilService,
              private authService : AuthService) {

  }

  ngOnInit(): void {
    this.listarPerfis();
    this.listarUsuarios();
    this.verificaAdmin();

  }
  verificaAdmin() {
    this.isAdmin = this.authService.isAdmin();
    this.usuarioLogado = this.authService.getIdUsuarioLogado();
    if(!this.isAdmin &&  this.usuarioLogado != 0){
      this.listarUsuario(this.usuarioLogado);
    }
  }


  salvarUsuario(form: NgForm): void {
    if (form.valid) {
    this.usuario.perfil = this.selectedPerfil;
    console.log('Dados do usuario:', this.usuario);
    this.usuarioService.salvarUsuario(this.usuario).pipe(
      catchError(error => {
        this.snackbarService.mensagem('Erro ao salvar usuario: ' + error);
        return of(null);
      })
    ).subscribe(
      () => {
        this.isSalvando = true;
        this.listarUsuarios();
        this.limparUsuario();
        this.snackbarService.mensagem('Usuario salvo com sucesso!')
      }
    );
    }else{
      this.snackbarService.mensagem('Não foi possível salvar. Preencha os campos obrigatórios!');
    }
  }


  editarUsuario(usuario : Usuario){
    this.usuario = usuario;
    this.selectedPerfil = this.usuario.perfil;
  }

  excluirUsuario(usuario : Usuario): void {
    this.usuarioService.excluirUsuario(usuario.id).pipe(
      catchError(error => {
        this.snackbarService.mensagem('Erro ao excluir usuário:', error);
        throw error; 
      })
    ).subscribe(
      () => {
        this.listarUsuarios();
        this.snackbarService.mensagem('Usuário excluído com sucesso!');
      }
    );
  }


  listarPerfis(): void {
    this.perfilService.listarTodos().pipe(
      catchError((error: any) => {
        this.snackbarService.mensagem('Erro ao listar os Perfis')
        return of([]);
      })
    ).subscribe(
      (data: Perfil[]) => {
        this.perfis = data;
      }
    );
  }

  listarUsuarios(): void {
    this.usuarioService.listarTodos().pipe(
      catchError((error: any) => {
        this.snackbarService.mensagem('Erro ao listar os Usuários')
        return of([]);
      })
    ).subscribe(
      (data: unknown[]) => {
        this.dataSource.data = data;
      }
    );
  }

  
  listarUsuario(id: number): void {
    this.usuarioService.listarPorID(id).pipe(
      catchError((error: any) => {
        this.snackbarService.mensagem('Erro tazer dados do usuário')
        return of([]);
      })
    ).subscribe(
      (data: any) => {
        this.usuario = data;
      }
    );
  }

  limparUsuario(){
    this.usuario = new Usuario();
    this.selectedPerfil = {};
    this.isSalvando = false;

  }

}
