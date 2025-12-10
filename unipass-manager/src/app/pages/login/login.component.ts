import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    // Simulação de autenticação bem-sucedida
    localStorage.setItem('authToken', 'example-token');
    this.router.navigate(['/inicio']);
  }

  onForgotPassword() {
    // Placeholder simples: aqui você pode futuramente integrar com fluxo de recuperação real
    alert('Recuperação de senha ainda não está implementada. Entre em contato com a administração do sistema.');
  }
}