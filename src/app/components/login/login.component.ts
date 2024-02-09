import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
  }

  login(): void {
    // Chamada ao serviço de autenticação para verificar as credenciais do usuário
    this.authService.login(this.username, this.password);
  }
}
