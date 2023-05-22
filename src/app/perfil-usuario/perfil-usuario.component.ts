import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppModule } from '../app.module';
import { OnInit } from '@angular/core';
import {slideAnimation, slideToSide, fastSlideAnimation, slideToSideFromRight} from '../slideAnimation'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
  animations: [slideAnimation, slideToSide, fastSlideAnimation, slideToSideFromRight]
})
export class PerfilUsuarioComponent implements OnInit{
  public my_orders: any[] = [];
  public is_orders_open: number = 0;
  public my_appointments: any[] = [];
  public is_appointments_open: number = 0;
  public user: any;
  public my_likes: any[] = []
  public most_liked_ongs: any[] = []

  public item_names = ['item a', 'item b', 'item c', 'item d', 'item e', 'item f', 'item g']
  
  constructor(private router: Router, private app: AppModule, private authService: AuthService) { }
  
  // goToPage(pageName:string){
  //   this.router.navigate([`${pageName}`]);
  // }
  // autenticate(pageName:string){
  //   let rot = this.app.autenticate_route(pageName);
  //   this.router.navigate([`${rot}`]);
  // }
  async ngOnInit() {
    await this.getName()
    await this.getMostLikedOngs();
    if (this.user.type === 'ong') {
      await this.getMyOrders()
    } else if (this.user.type === 'user') {
      await this.getMyAppointments()
    }
  }

  async getName() {
    this.user = await this.authService.getUserFromStorage()
  }

  toggleOrderMenu() {
    this.is_orders_open = this.is_orders_open === 0 ? 1 : 0;
  }
  toggleAppointmentMenu() {
    this.is_appointments_open = this.is_appointments_open === 0 ? 1 : 0;
  }

  async getMostLikedOngs() {
    const res = await fetch(`http://localhost:3000/mostlikedongs`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      this.most_liked_ongs = await res.json()
      console.log(this.most_liked_ongs)
    }
  }

  async getMyOrders() {
    const res = await fetch(`http://localhost:3000/myorders`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      const data = await res.json();
      if (!data) return
      for (let i = 0; i < data?.length; i++) {
        data[i].sum_items = 0 
        data[i].sum_donated = 0 
        for (let j = 0; j < data[i].items?.length; j++) {
          data[i].sum_items += data[i].items[j]
          data[i].sum_donated += data[i].donated[j]
        }
      }
      
      this.my_orders = data
      console.log(this.my_orders)
    }
  }
  async getMyAppointments() {
    const res = await fetch(`http://localhost:3000/myappointments`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      const data = await res.json();
      console.log(data)
      this.my_appointments = data;
    }
  }




  async likeOng(ong_id: string, index: number){
    const res = await fetch(`http://localhost:3000/like?ong_id=${ong_id}`, {
      credentials: 'include',
      method: 'GET',
    })
    if (res.status === 200){
      this.most_liked_ongs[index].liked = true;
      this.most_liked_ongs[index].likes++;
    }
  }
  
  async unlikeOng(ong_id: string, index: number){
    const res = await fetch(`http://localhost:3000/unlike?ong_id=${ong_id}`, {
      credentials: 'include',
      method: 'GET',
    })
    if (res.status === 200){
      this.most_liked_ongs[index].liked = false;
      this.most_liked_ongs[index].likes--;
    }
  }

  async getMyLikes() {
    const res = await fetch(`http://localhost:3000/mylikes`, {
      credentials: 'include',
      method: 'GET',
    })
    const data = await res.json()
    if (data && res.status === 200){
      this.my_likes = data;
    }
  }





  goTo(url: string){
    this.router.navigateByUrl(`/${url}`)
  }
}
