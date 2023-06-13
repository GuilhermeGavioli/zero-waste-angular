import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../global.service';
import { slideToSide } from '../slideAnimation';

@Component({
  selector: 'app-fazer-agendamento',
  templateUrl: './fazer-agendamento.component.html',
  styleUrls: ['./fazer-agendamento.component.css'],
  animations: [slideToSide]
})
export class FazerAgendamentoComponent implements OnInit {
  public order_id: string = ''
  public working_times: any = {}
  public order: any = {}
  public closed = '00:00-00:00'
  public week_days = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom']
  public possible_items = ['Farinhas e Amidos', 'Conservas', 'Óleos e Gorduras', 'Leites e Derivados', 'Sucos e Bebidas', 'Grãos e Cereais', 'Enlatados']
  public inputData: any[] = [0,0,0,0,0,0,0];
  public selected: any | null = null;
  public input: string = '';

  constructor(private route: ActivatedRoute, private global: GlobalService) { }
  @ViewChild('AppointmentButton') AppointmentButton!: ElementRef;
  @ViewChild('ErrorMessage') ErrorMessage!: ElementRef;
  // appointment_id

  async ngOnInit() {
    this.order_id = this.route.snapshot.paramMap.get('order_id') || '';
    console.log(this.order_id)
    const res = await fetch(`${this.global.APIURL}/getorderandtime?order_id=${this.order_id}`, {
      credentials: 'include',
      method: 'GET',
    })
    if (res.status === 200) {
      const data = await res.json();
      console.log(data)
      this.working_times = data.owner.working_time
      this.order = data.order
      console.log(this.working_times)
    }
  }

  public loading = false;
  async makeAppointment() {
    this.showLoading()
    const res = await fetch(`${this.global.APIURL}/makeappointment`, {
      credentials: 'include',
      body: JSON.stringify({order_parent_id: this.order_id, items: this.inputData, day: 'ter'}),
      method: 'POST',
    })
    if (res.status === 200) {
      console.log('ok')
    } else {
      this.denied_message = await res.text();
      this.handleMessageAppearence();
    }
    this.hideLoading()
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
  }


 showLoading() {
    this.loading = true
    this.AppointmentButton.nativeElement.disabled = true
  }

  hideLoading() {
    this.loading = false
    this.AppointmentButton.nativeElement.disabled = false
  }

  toggleSelection(i: number) {
    this.inputData[i] = this.inputData[i] ? 0 : 1;
    console.log(this.inputData[i])
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
}
