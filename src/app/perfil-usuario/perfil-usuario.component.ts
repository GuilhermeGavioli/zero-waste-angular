import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppModule } from '../app.module';
import { OnInit } from '@angular/core';
import {slideAnimation, slideToSide, fastSlideAnimation, slideToSideFromRight} from '../slideAnimation'
import { AuthService } from '../auth.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
  animations: [slideAnimation, slideToSide, fastSlideAnimation, slideToSideFromRight]
})
export class PerfilUsuarioComponent implements OnInit{
  @ViewChild('appointmentContainer') appointmentContainer!: ElementRef;
  
  public my_orders: any[] = [];
  public is_orders_open: number = 1;
  public my_appointments: any[] = [];
  public is_appointments_open: number = 1;
  public user: any;
  public my_likes: any[] = []
  public most_liked_ongs: any[] = []


  public possible_items = ['Farinhas e Amidos', 'Conservas', 'Óleos e Gorduras', 'Leites e Derivados', 'Sucos e Bebidas', 'Grãos e Cereais', 'Enlatados']


  
  constructor(private router: Router, private authService: AuthService, private global: GlobalService, private route: ActivatedRoute) { }
  
  // goToPage(pageName:string){
  //   this.router.navigate([`${pageName}`]);
  // }
  // autenticate(pageName:string){
  //   let rot = this.app.autenticate_route(pageName);
  //   this.router.navigate([`${rot}`]);
  // }
  async ngOnInit() {
     this.route.url.subscribe((urlSegments: any) => {
      const routeName = urlSegments[urlSegments.length - 1].path;
      this.global.setMyRoute(routeName)
    });

    await this.getName()
    
    // await this.getMostLikedOngs();
    if (this.user.type === 'ong') {
      await this.getMyOrders()
      await this.getMyOngLikes()
    } else if (this.user.type === 'user') {
      await this.getMyAppointments()
    }
    await this.getLastOrders()
  }

  goTo(url: string) {
    this.global.goTo(url)
  }

  loading = true;
  
  openAppointmentDetails(appointment_id: string) {
    this.appointmentContainer.nativeElement.style.bottom = '0'
    
  }

  async desmarcar(appointment_id: string) {
    const res = await fetch(`${this.global.APIURL}/delete/myappointment?appointment_id=${appointment_id}`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      this.my_appointments = this.my_appointments.filter(appointment => appointment._id.toString() !== appointment_id)
      this.my_appointments_count--
      console.log(this.my_appointments)
    } else {
      console.log(await res.text())
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
    const res = await fetch(`${this.global.APIURL}/mostlikedongs`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      const data = await res.json();
      this.most_liked_ongs = data;
      console.log('most liked')
      console.log(this.most_liked_ongs)
      for(let i = 0; i < data?.length; i++){
        const idExistsInMyLikes = this.my_likes.some(like => like?.ong_id === data[i].ongInfo._id);
        if (idExistsInMyLikes){
          data[i].liked = true;
        }
        // data[i].likedCount = data[i].likedCount[`${data[i].ongInfo._id}`] || 0
        // this.most_liked_ongs.push(data[i])
      }
    }
  }

  public last_orders: any;
  async getLastOrders() {
    const res = await fetch(`${this.global.APIURL}/gettwolastorders`, {
      credentials: 'include',
      method: 'GET',
    })
    if (res.status === 200) {
      const data = await res.json();
      if (data) {
        
        for (let i = 0; i < data?.length; i++) {
          data[i].sum_items = 0 
          data[i].sum_donated = 0 
          for (let j = 0; j < data[i].items?.length; j++) {
            data[i].sum_items += data[i].items[j]
            data[i].sum_donated += data[i].donated[j]
          }
        }
        this.last_orders = data
      }
    }
  }

  async getMyOrders() {
    const res = await fetch(`${this.global.APIURL}/myactiveorders`, {
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
    } else {
      console.log(await res.text())
    }
  }

  public my_appointments_count: number = 0;
  public my_not_viewd_donations_count: number = 0;
  async getMyAppointments() {
    const res = await fetch(`${this.global.APIURL}/myactiveappointments`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      const data = await res.json();
      console.log(data)
      this.my_appointments = data;
      this.my_appointments?.forEach(item => { 
        if (!item.confirmed) this.my_appointments_count++
        if (item?.confirmed && !item?.viewed) this.my_not_viewd_donations_count++
      })
    }
  }




  async likeOng(ong_id: string, index: number){
    const res = await fetch(`${this.global.APIURL}/like?ong_id=${ong_id}`, {
      credentials: 'include',
      method: 'GET',
    })
    if (res.status === 200){
      this.most_liked_ongs[index].liked = true;
      this.most_liked_ongs[index].likedCount++;
    }
  }
  
  async unlikeOng(ong_id: string, index: number){
    const res = await fetch(`${this.global.APIURL}/unlike?ong_id=${ong_id}`, {
      credentials: 'include',
      method: 'GET',
    })
    if (res.status === 200){
      this.most_liked_ongs[index].liked = false;
      this.most_liked_ongs[index].likedCount--;
    }
  }

  async getMyLikes() {
    const res = await fetch(`${this.global.APIURL}/mylikes`, {
      credentials: 'include',
      method: 'GET',
    })
    const data = await res.json()
    if (data && res.status === 200){
      this.my_likes = data;
    }
  }

  public my_ong_likes = 0;
  async getMyOngLikes() {
    const res = await fetch(`${this.global.APIURL}/myonglikes`, {
      credentials: 'include',
      method: 'GET',
    })
    const data = await res.json()
    if (data && res.status === 200){
      this.my_ong_likes = data;
    }
  }


  
  


  

  

  goToAppointmentsFromOrderPage(order_id: string) {
    this.global.setLastRoute('perfil')
    this.router.navigateByUrl(`/agendamentosdaorder/${order_id}`)
  }

  goToOrderPage(order_id: string) {
    this.global.setLastRoute('perfil')
    this.router.navigateByUrl(`/solicitacao/${order_id}`)
  }
  goToOngPage(ong_id: string) {
    this.global.setLastRoute('perfil')
    this.router.navigateByUrl(`/ong/${ong_id}`)
  }
}
