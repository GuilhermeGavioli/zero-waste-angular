import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { slideAnimation } from '../slideAnimation';

@Component({
  selector: 'app-recup-password',
  templateUrl: './recup-password.component.html',
  styleUrls: ['./recup-password.component.css'],
  animations: [slideAnimation]
})
export class RecupPasswordComponent implements OnInit {


  @ViewChild('SendButton') SendButton!: ElementRef;
  @ViewChild('ErrorMessage') ErrorMessage!: ElementRef;

  async ngOnInit() {
      
  }
    // this.showLoading()
  
  constructor(private global: GlobalService, private router: Router) {
    
  }
    
  public loading = false;
  public email: string = '';

  async forgetPassword() {
    this.showLoading()
    
    const res = await fetch(`${this.global.APIURL}/forgetpassword?email=${this.email}`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      this.goTo(`mail/${this.email}`)
      
    } else {
      this.denied_message = await res.text()
      this.handleMessageAppearence();
    }
  }

  public denied_message: string = ''
  public is_message_being_shown = false;
  handleMessageAppearence() {
    setTimeout(() => {
      this.hideLoading()
    }, 550);
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

  showLoading() {
    this.loading = true
    this.SendButton.nativeElement.disabled = true
  }

  hideLoading() {
    this.loading = false
    this.SendButton.nativeElement.disabled = false
  }

  goTo(path: string) {
    this.router.navigateByUrl(`/${path}`)
  }

  
}
