import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {

  
  @ViewChild('SendButton') SendButton!: ElementRef;
  @ViewChild('ErrorMessage') ErrorMessage!: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, private global: GlobalService){}
  
  public code_path: string | null = null
  public password: string = ''
  public confirm_password: string = ''

  async ngOnInit(): Promise<void> {
    this.code_path = this.route.snapshot.paramMap.get('code_path') || null;    
    if (!this.code_path) this.goTo('login')
  }





  async fireChangePassword() {
      this.showLoading()
      const res = await fetch(`${this.global.APIURL}/changepasswordconfirmation`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({code_path: this.code_path, password: this.password, confirm_password: this.confirm_password})
      });
      if (res.status === 200) {
        this.goTo('login')
        
      } else {
        this.denied_message = await res.text()
        this.handleMessageAppearence();
      }
  }


  public loading: boolean = false
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
