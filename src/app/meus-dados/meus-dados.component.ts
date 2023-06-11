import { Component,ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { GlobalService } from '../global.service';
import { slideToSide } from '../slideAnimation';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.css'],
  animations: [slideToSide]
})
export class MeusDadosComponent implements OnInit {
  @ViewChild('changeInfoButton') changeInfoButton!: ElementRef;
  @ViewChild('deleteAccountButton') deleteAccountButton!: ElementRef;

  
  @ViewChild('ErrorMessage') ErrorMessage!: ElementRef;
  public denied_message: string = ''
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

  loading: boolean = false;
  showLoading() {
    this.loading = true
    this.changeInfoButton.nativeElement.disabled = true
    this.deleteAccountButton.nativeElement.disabled = true
  }

  hideLoading() {
    this.loading = true
    this.changeInfoButton.nativeElement.disabled = false
    this.deleteAccountButton.nativeElement.disabled = false
  }


  me: any;
  new_me: any = {}
  constructor(private router: Router, private global: GlobalService, private route: ActivatedRoute, private authService: AuthService) { }
  
  public spinnerColor = 'yellow';

  async ngOnInit() {
    this.route.url.subscribe((urlSegments: any) => {
      const routeName = urlSegments[urlSegments.length - 1].path;
      console.log(routeName)
      this.global.setLastRoute(routeName)
    });
    await this.getMyData()
  }

  public address_state: string = '';

  async getMyData() {
    const res = await fetch(`http://localhost:3000/getMyInfo`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      const data = await res.json()
      if (!data) return;
      this.me = data;
      console.log(this.me)
      this.new_me = data;
     
      // this.me = await res.json()
    } else {
      // this.goTo('login')
      console.log(await res.text())
      
      console.log('no')
    }
  }


  async changeInfo() {
    this.showLoading()
    const res = await fetch(`http://localhost:3000/account/change`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ password: this.new_me.password, confirm_password: this.new_me.password, name: this.new_me.name})
    });
    if (res.status === 200) {
      window.location.href = '/meus-dados';
      
      console.log(this.me)
      this.address_state = this.me?.address_state;
      // this.me = await res.json()
    } else {
      this.denied_message = await res.text()
      this.handleMessageAppearence()
    }
    this.hideLoading()
  }
  async deleteAccount() {
    this.showLoading()
    console.log(this.new_me.password)
    const res = await fetch(`http://localhost:3000/account/delete`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ password: this.new_me.password})
    });
    if (res.status === 200) {
      this.authService.logout()
      window.location.href = '/meus-dados';
      
      console.log(this.me)
      this.address_state = this.me?.address_state;
      // this.me = await res.json()
    } else {
      this.denied_message = await res.text()
      this.handleMessageAppearence()
    }
    this.hideLoading()
  }

  goTo(path: string) {
    this.router.navigateByUrl(`${path}`)
  }
}
