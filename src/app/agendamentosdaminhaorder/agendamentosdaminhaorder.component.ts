import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { GlobalService } from '../global.service';
import { slideToSide } from '../slideAnimation';

@Component({
  selector: 'app-agendamentosdaminhaorder',
  templateUrl: './agendamentosdaminhaorder.component.html',
  styleUrls: ['./agendamentosdaminhaorder.component.css'],
  animations: [slideToSide]
})
export class AgendamentosdaminhaorderComponent {

  @ViewChild('ErrorMessage') ErrorMessage!: ElementRef;
  @ViewChild('ConfirmDonationButton') ConfirmDonationButton!: ElementRef;


  public weekdays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']
  public order_id: string = ''
  public order: any | null;
  public user: any = {}
  public my_donation = [0, 0, 0, 0, 0, 0, 0]
  
  public possible_items = ['Farinhas e Amidos', 'Conservas', 'Óleos e Gorduras', 'Leites e Derivados', 'Sucos e Bebidas', 'Grãos e Cereais', 'Enlatados']
  

  public appointments: any = []
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private global: GlobalService){}
  
  

  async ngOnInit(): Promise<void> {
    await this.getUserInfo()
    this.order_id = this.route.snapshot.paramMap.get('order_id') || '';    
    if (!this.order_id || this.user.type !== 'ong') this.router.navigateByUrl('/perfil');
    // await this.getOrder()
    await this.getAppointmentsFromMyOrder()
    console.log(this.appointments)
    this.filterArray()
  }

  public search_text: string = ''
  public filtered_appointments: any[] = []
  filterArray() {
    if (this.search_text) {
      this.filtered_appointments = this.appointments.filter((item: any) =>
        item?._id.toLowerCase().includes(this.search_text.toLowerCase())
      );
    } else {
      this.filtered_appointments = this.appointments
    }
  }

  public all_disabled = false;

  async confirmDonation(appointment_id: string) {
    this.all_disabled = true
    this.ConfirmDonationButton.nativeElement.disabled = true
     const res = await fetch(`${this.global.APIURL}/confirmdonation?appointment_id=${appointment_id}`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      this.appointments.forEach((appointment: any) => {
        if (appointment._id === appointment_id) {
          appointment.confirmed = true;
        }
       })
      this.appointments = appointment_id
    } else {
      this.denied_message = await res.text()
      this.handleMessageAppearence()
    }


  }

  async getAppointmentsFromMyOrder() {
    const res = await fetch(`${this.global.APIURL}/getAppointmentsFromMyOrder?order_id=${this.order_id}`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      this.appointments = await res.json()
    } else {
      console.log(await res.text())
    }
  }
  

  async getUserInfo() {
    this.user = await this.authService.getUserFromStorage()
  }

  ChangeInputDonation(value: any, i: number) {
    this.my_donation[i] = value;
    console.log(this.my_donation)
  }



  async getOrder() {
    const res = await fetch(`${this.global.APIURL}/getorderandtime?order_id=${this.order_id}`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      const data = await res.json()
      if (data) {
        this.order = data;
      }
    } else {
      console.log(await res.text())
    }
  }

  public loading: boolean = false
  public denied_message: string = ''
  public is_message_being_shown = false;
  handleMessageAppearence() {
    setTimeout(() => {
      this.hideLoading()
      this.ConfirmDonationButton.nativeElement.disabled = false
    }, 850);
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
    this.ConfirmDonationButton.nativeElement.disabled = true
  }

  hideLoading() {
    this.loading = false
    this.ConfirmDonationButton.nativeElement.disabled = false
  }

  goTo(path: string) {
    this.router.navigateByUrl(`/${path}`)
  }
}
