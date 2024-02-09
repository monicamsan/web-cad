import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Perfil } from './perfil.model';
import { PerfilService } from './perfil.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/shared/SnackBarService';
import { catchError, of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfil: Perfil = new Perfil();
  perfis!: Perfil[];

  displayedColumns = ['nome', 'administrador', 'ativo', 'acoes'];
  dataSource = new MatTableDataSource();
  
  @ViewChild(MatSort) sort!: MatSort;
  isSalvando: boolean = false;


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(private perfilService: PerfilService,
              private snackbarService: SnackbarService) {

  }

  ngOnInit(): void {
    this.listarPerfis();
    this.listarPerfis();


  }


  salvarPerfil(form: NgForm): void {
    if (form.valid) {
    console.log('Dados do perfil:', this.perfil);
    this.perfilService.salvarPerfil(this.perfil).pipe(
      catchError(error => {
        this.snackbarService.mensagem('Erro ao salvar perfil: ' + error);
        return of(null);
      })
    ).subscribe(
      () => {
        this.isSalvando = true;
        this.listarPerfis();
        this.limparPerfil();
        this.snackbarService.mensagem('Perfil salvo com sucesso!')
      }
    );
    }else{
      this.snackbarService.mensagem('Não foi possível salvar. Preencha os campos obrigatórios!');
    }
  }


  editarPerfil(perfil : Perfil){
    this.perfil = perfil;
  }

  excluirPerfil(perfil : Perfil): void {
    this.perfilService.excluirPerfil(perfil.id).pipe(
      catchError(error => {
        this.snackbarService.mensagem('Erro ao excluir perfil:', error);
        throw error; 
      })
    ).subscribe(
      () => {
        this.listarPerfis();
        this.snackbarService.mensagem('Perfil excluído com sucesso!');
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


  limparPerfil(){
    this.perfil = new Perfil();
    this.isSalvando = false;

  }


}
