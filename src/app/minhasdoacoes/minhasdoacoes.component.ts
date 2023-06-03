import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-minhasdoacoes',
  templateUrl: './minhasdoacoes.component.html',
  styleUrls: ['./minhasdoacoes.component.css']
})
export class MinhasdoacoesComponent {


  public my_donations: any = []
  public user: any;

  constructor(private router: Router, private authService: AuthService) { }
  
  async getUserInfo() {
    this.user = await this.authService.getUserFromStorage()
  }

  async ngOnInit(): Promise<void> {

    await this.getUserInfo()
    if (this.user.type !== 'user') {
      this.router.navigateByUrl('/perfil')
    }
    await this.getMyDonations()
  }

  async getMyDonations() {
    const res = await fetch(`http://localhost:3000/getmydonations`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      const data = await res.json();
      this.my_donations = data;
    }
  }
}
