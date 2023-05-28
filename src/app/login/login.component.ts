import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppModule } from '../app.module';
import { AuthService } from '../auth.service';
import { slideAnimation, slideToSide, fastSlideAnimation, slideToSideFromRight, slideAnimationWithLeave } from '../slideAnimation';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideAnimation, slideToSide, fastSlideAnimation, slideToSideFromRight, slideAnimationWithLeave]
})
export class LoginComponent {
  public login_email: string = ''
  public login_password: string = ''

  @ViewChild('opacitycontainer') opacitycontainer!: ElementRef;
  @ViewChild('spinner') spinner!: ElementRef;
  @ViewChild('loginButton') loginButton!: ElementRef;

  constructor(private router: Router, private authService: AuthService) { }


  public state: string = 'login'
  public loading: boolean = false;
  public first_time: boolean = true;
  public painel_open: boolean = false;

  


  

  async oauth(){
    const res = await fetch(`http://localhost:3000/oauth`, {
      credentials: 'include',
      method: 'GET',
    });
  }

  openRegisterChoisePainel() {
    this.painel_open = !this.painel_open;
    if (this.painel_open) {
      this.opacitycontainer.nativeElement.style.opacity = '50%'
    } else {
      this.opacitycontainer.nativeElement.style.opacity = 'unset'
    }
  }

  showLoading() {
    this.loading = true
    this.loginButton.nativeElement.disabled = true
  }

  hideLoading() {
    this.loading = false
    this.loginButton.nativeElement.disabled = false
  }
  


  async login() {
    this.showLoading()
    setTimeout(async () => {
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
      this.hideLoading()
    }, 1500);
  }
}
