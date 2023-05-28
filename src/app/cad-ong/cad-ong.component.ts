import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { slideAnimation, slideToSide, fastSlideAnimation, slideToSideFromRight } from '../slideAnimation';

@Component({
  selector: 'app-cad-ong',
  templateUrl: './cad-ong.component.html',
  styleUrls: ['./cad-ong.component.css'],
  animations: [slideAnimation, slideToSide, fastSlideAnimation, slideToSideFromRight]
})
export class CadONGComponent {


  public login_name: string = ''
  public login_email: string = ''
  public login_password: string = ''

  constructor(private router: Router, private authService: AuthService) { }


  public state: string = 'login'
  public first_time: boolean = true;




  

  async oauth(){
    const res = await fetch(`http://localhost:3000/oauth`, {
      credentials: 'include',
      method: 'GET',
    });
  }
  


  async login() {
  //   const res = await fetch(`http://localhost:3000/account/login/default`, {
  //     credentials: 'include',
  //     method: 'POST',
  //     body: JSON.stringify({email: this.login_email, password: this.login_password})
  //   });
  //   if (res.status === 200) {
  //     const data = await res.json();
   
  //     localStorage.setItem('user-info', JSON.stringify({ type: data.type, name: data.name }))
  //     this.router.navigate(['/perfil'])
      
  //   } else {
  //     console.log(await res.text());
  //   }
  }
}
