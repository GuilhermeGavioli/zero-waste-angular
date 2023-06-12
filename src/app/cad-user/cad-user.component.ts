import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { GlobalService } from '../global.service';
import { slideAnimation } from '../slideAnimation';

@Component({
  selector: 'app-cad-user',
  templateUrl: './cad-user.component.html',
  styleUrls: ['./cad-user.component.css'],
  animations: [slideAnimation]
})
export class CadUserComponent {
  

  constructor(private router: Router, private authService: AuthService, private global: GlobalService) { }

  
  public email: string = ''
  public valid_email: boolean = false
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('emailContainer') emailContainer!: ElementRef;

  public name: string = ''
  public valid_name: boolean = false
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('nameContainer') nameContainer!: ElementRef;
  

  public password: string = ''
  public valid_password: boolean = false
  @ViewChild('passwordInput') passwordInput!: ElementRef;


  public confirmPassword: string = ''
  public valid_confirm_password: boolean = false

  @ViewChild('registerButton') registerButton!: ElementRef;

  @ViewChild('ErrorMessage') ErrorMessage!: ElementRef;



  





  


 

  goTo(url: string){
    this.router.navigateByUrl(`/${url}`)
  }


  public loading: boolean = false;
  showLoading() {
    this.loading = true
    this.registerButton.nativeElement.disabled = true
  }

  hideLoading() {
    this.loading = false
    this.registerButton.nativeElement.disabled = false
  }
  
  async register() {
    this.showLoading()
    const user: any = {
      name: this.name,
      email: this.email,
      password: this.password,
      confirm_password: this.confirmPassword,
    }

    
 
      const res = await fetch(`${this.global.APIURL}/account/register/user`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(user)
      });
      if (res.status === 200) {
        const data = await res.text();
        this.router.navigateByUrl(`/mail/${user.email}`)
        // localStorage.setItem('user-info', JSON.stringify({ type: data.type, name: data.name }))
        // this.router.navigate(['/perfil'])
        
      } else {
        this.denied_message = await res.text();
        this.handleMessageAppearence()
      }
      this.hideLoading()

  }

  public is_message_being_shown = false;
  public denied_message = '';
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


  
}
