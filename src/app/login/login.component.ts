import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppModule } from '../app.module';
import { AuthService } from '../auth.service';
import { Validators } from '@angular/forms';
import { slideAnimation, slideToSide, fastSlideAnimation, slideToSideFromRight, slideAnimationWithLeave } from '../slideAnimation';
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideAnimation, slideToSide, fastSlideAnimation, slideToSideFromRight, slideAnimationWithLeave]
})
export class LoginComponent {
  public email: string = ''
  public password: string = ''
  public valid_email: boolean = false
  public valid_password: boolean = false

  @ViewChild('opacitycontainer') opacitycontainer!: ElementRef;
  @ViewChild('spinner') spinner!: ElementRef;
  @ViewChild('loginButton') loginButton!: ElementRef;

  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  @ViewChild('emailContainer') emailContainer!: ElementRef;
  @ViewChild('passwordContainer') passwordContainer!: ElementRef;

  @ViewChild('ErrorMessage') ErrorMessage!: ElementRef;

  constructor(private router: Router, private authService: AuthService, private global: GlobalService) { }


  public state: string = 'login'
  public loading: boolean = false;
  public first_time: boolean = true;
  public painel_open: boolean = false;

  
  // email: Joi.string().email().min(6).max(113).required(),
  // password: Joi.string().regex(/^[a-zA-Z0-9 ]*$/).min(8).max(50).required(),

  

  async oauth(){
    const res = await fetch(`${this.global.APIURL}/oauth`, {
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
  
  onEmailInputChange() {
    if (this.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const valid = emailRegex.test(this.email)
      // Update UI based on email validity
      if (valid) {
        this.valid_email = true
        this.emailContainer.nativeElement.style.border = '2px solid var(--zw-red)'
        // Valid email
        // Perform UI updates or other actions
      } else {
        this.valid_email = false
        this.emailContainer.nativeElement.style.border = '1px solid #b4b4b4'
        // Invalid email
        // Perform UI updates or other actions
      }
    } else {
      this.valid_email = false
      this.emailContainer.nativeElement.style.border = '1px solid #b4b4b4'
      // Empty email
      // Perform UI updates or other actions
    }
  }


  public showPasswordMessage: boolean = false;
  onPasswordInputChange() {
    if (this.password) {
      

      const passwordRegex = /^[a-zA-Z0-9 ]*$/;
      const specialRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
      const valid = passwordRegex.test(this.password)
      
      // Update UI based on email validity
      if (valid && (this.password.length > 8 && this.password.length < 40)) {
        const validSpecialCharacters = specialRegex.test(this.password)
        if (validSpecialCharacters) {
          this.valid_password = true
          this.passwordContainer.nativeElement.style.border = '2px solid var(--zw-red)'
        } else {
          this.showPasswordMessage = true
        }

        // Valid email
        // Perform UI updates or other actions
      } else {
        this.passwordContainer.nativeElement.style.border = '1px solid #b4b4b4'
        this.valid_password = false
        this.showPasswordMessage = true
        // Invalid email
        // Perform UI updates or other actions
      }
    } else {
      this.passwordContainer.nativeElement.style.border = '1px solid #b4b4b4'
      this.valid_password = false
      this.showPasswordMessage = true
      // Empty email
      // Perform UI updates or other actions
    }
  }

  public denied_message: string = ''
  async login() {
    this.showLoading()
    
      const res = await fetch(`${this.global.APIURL}/account/login/default`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({email: this.email, password: this.password})
      });
      if (res.status === 200) {
        const data = await res.json();
        
        localStorage.setItem('user-info', JSON.stringify({...data}))
        this.router.navigate(['/perfil'])
        
      } else {
        this.denied_message = await res.text();
        this.handleMessageAppearence();
      }
      this.hideLoading()

  }

  public is_message_being_shown = false;
  handleMessageAppearence() {
    if (this.is_message_being_shown) return;
    this.is_message_being_shown = true;
    this.ErrorMessage.nativeElement.innerText = this.denied_message;
    this.ErrorMessage.nativeElement.style.top = '25px'
    setTimeout(() => {
      this.is_message_being_shown = false
      this.ErrorMessage.nativeElement.style.top = '-300px'
      this.denied_message = '';
    }, 3000);

  }

  goTo(path: string) {
    this.router.navigateByUrl(`/${path}`)
  }
}
