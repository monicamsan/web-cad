import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  // Método para exibir mensagem de snackbar
  public mensagem(mensagem: string, acao: string = 'Fechar', duracao: number = 3000, 
                         posicaoHorizontal: MatSnackBarHorizontalPosition = 'center', 
                         posicaoVertical: MatSnackBarVerticalPosition = 'bottom'): void {
    this.snackBar.open(mensagem, acao, {
      duration: duracao,
      horizontalPosition: posicaoHorizontal,
      verticalPosition: posicaoVertical
    });
  }
}
