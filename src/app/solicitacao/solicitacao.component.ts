
  import { getLocaleExtraDayPeriods } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { GlobalService } from '../global.service';
  import { slideAnimation, slideToSide } from '../slideAnimation';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.css'],
  animations: [slideAnimation, slideToSide]
})
export class SolicitacaoComponent {

 
  @ViewChild('container') container!: ElementRef;
  @ViewChild('AppointmentButton') AppointmentButton!: ElementRef;
  @ViewChild('ErrorMessage') ErrorMessage!: ElementRef;

  public inputData: any[] = [0,0,0,0,0,0,0];
  public selected: any | null = null;
  public input: string = '';
  public closed = '00:00-00:00'
  public week_days = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom']
  public possible_items = ['Farinhas e Amidos', 'Conservas', 'Óleos e Gorduras', 'Leites e Derivados', 'Sucos e Bebidas', 'Grãos e Cereais', 'Enlatados']

  public orders: any[] = []
  public order: any = null // opened ong info
  // public my_likes: any[] = []
  public current_pack: number = 1
  public is_over: number = 0
  public is_open: number = 0

  public is_on_order_screen = 0;

  constructor(private router: Router, private authService: AuthService, private global: GlobalService, private route: ActivatedRoute) {
    
  }
  public user: any;


  public order_id: string | null = null;
  async ngOnInit() {
    this.order_id = this.route.snapshot.paramMap.get('order_id') || '';    
    if (!this.order_id) this.router.navigateByUrl('/perfil');

    this.route.url.subscribe((urlSegments: any) => {
      const routeName = urlSegments[urlSegments.length - 1].path;
      this.global.setMyRoute(routeName)
    });
    await this.getOrder()
    await this.getUserInfo()
    if (this.user.type === 'user') {
          await this.getMyAppointments()
     }
  }













  public is_appointed: null | boolean = null;
  public relative_appointment: string = '';

 public my_active_appointments: any[] = [];
  public my_appointments_count: number = 0;
  public my_not_viewd_donations_count: number = 0;

  async getMyAppointments() {
    const res = await fetch(`${this.global.APIURL}/myactiveappointments`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      const data = await res.json();
      this.my_active_appointments = data;
      this.is_appointed = null
      this.my_active_appointments?.forEach((appointment: any) => {
        if (appointment?.order_parent_id == this.order?._id) { 
          this.relative_appointment = appointment._id;
          this.is_appointed = true;
        }
      })
      console.log(this.relative_appointment)
    }
  }

  toggleSelection(i: number) {
    this.inputData[i] = this.inputData[i] ? 0 : 1;
  }

  preventDefault(e: Event) {
    e.stopPropagation();
  }

  inputDataChanged(i: number) {
    console.log(this.inputData[i])
    const missing = this.order.items[i] - this.order.donated[i];
    if (this.inputData[i] > missing) {
      this.inputData[i] = missing;
    }
  }



  async getUserInfo() {
    this.user = await this.authService.getUserFromStorage()
  }

  // makeAppointment(order_id: string) {
  //   this.global.goTo(`agendando/${order_id}`)
  // }

  public owner: any;
  async getOrder() {
    const res = await fetch(`${this.global.APIURL}/getorderandtime?order_id=${this.order_id}`, {
      credentials: 'include',
      method: 'GET',
    })
    if (res.status === 200) {
      const data = await res.json();
      console.log(data)
      this.order = data.order;
      this.owner = data.owner
    }

    console.log(this.owner)
  }



  goToOngPage(ong_id: string) {
    this.router.navigateByUrl(`/ong/${ong_id}`)
  }







  navigateTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  public selected_time: number | null = null;
  changeTime(i: number) {
    this.selected_time = i;
  }



  public loading: boolean = false;
  async makeAppointment() {
    this.showLoading()
    if (!this.selected_time) {
      this.denied_message = 'Horário/ Dia para o agendamento não foi selecionado'
      this.handleMessageAppearence()
      
    } else {

      const keys = Object.keys(this.owner.working_time);
      const res = await fetch(`${this.global.APIURL}/makeappointment`, {
        credentials: 'include',
        body: JSON.stringify({order_parent_id: this.order._id, items: this.inputData, day: keys[this.selected_time]}),
        method: 'POST',
      })
      if (res.status === 200) {
        window.location.href = '/meus-agendamentos'
      } else {
        this.denied_message = await res.text();
        this.handleMessageAppearence();
      }
    }

  }

  async desmarcar(appointment_id: string) {
    this.showLoading()
    const res = await fetch(`${this.global.APIURL}/delete/myappointment?appointment_id=${appointment_id}`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      this.my_active_appointments = this.my_active_appointments.filter(appointment => appointment._id !== appointment_id)
      this.hideLoading()
      window.location.href = '/perfil'
    } else {
      this.denied_message = await res.text()
      this.handleMessageAppearence()
      this.hideLoading()
    }
  }

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
    this.hideLoading()
  }


 showLoading() {
    this.loading = true
    this.AppointmentButton.nativeElement.disabled = true
  }

  hideLoading() {
    this.loading = false
    this.AppointmentButton.nativeElement.disabled = false
  }

}
