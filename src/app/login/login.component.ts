import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppModule } from '../app.module';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public login_email: string = ''
  public login_password: string = ''

  constructor(private router: Router) { }
  


  async login() {
    const res = await fetch(`http://localhost:3000/account/login/default`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({email: this.login_email, password: this.login_password})
    });
    if (res.status === 200) {
      const data = await res.json();
   
      localStorage.setItem('user-info', JSON.stringify({ type: data.type, name: data.name }))
      this.router.navigate(['/perfil'])
      
    } else {
      console.log(await res.text());
    }
  }
}
