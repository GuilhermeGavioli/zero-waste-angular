
  import { getLocaleExtraDayPeriods } from '@angular/common';
import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
  import { slideAnimation } from '../slideAnimation';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.css'],
  animations: [slideAnimation]
})
export class SolicitacaoComponent {

  public weekdays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']
  public order_id: string = ''
  public order: any | null;
  public user: any = {}
  public my_donation = [0,0,0,0,0,0,0]

  public possible_items = ['Farinhas e Amidos', 'Conservas', 'Óleos e Gorduras', 'Leites e Derivados', 'Sucos e Bebidas', 'Grãos e Cereais', 'Enlatados']


  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService){}
  
  async ngOnInit(): Promise<void> {
    await this.getUserInfo()
    this.order_id = this.route.snapshot.paramMap.get('order_id') || '';    
    if (!this.order_id) this.router.navigateByUrl('/perfil');
    await this.getOrder()
    console.log(this.order)
  }

  async getUserInfo() {
    this.user = await this.authService.getUserFromStorage()
  }

  ChangeInputDonation(value: any, i: number) {
    this.my_donation[i] = value;
    console.log(this.my_donation)
  }

  async makeAppointment() {
    const res = await fetch(`http://localhost:3000/makeappointment`, {
      body: JSON.stringify({
        order_parent_id: this.order_id,
        day: 'ter',
        items: this.my_donation
      }),
      credentials: 'include',
      method: 'POST',
    });
    if (res.status === 200) {
      console.log('ok')
    } else {
      console.log(await res.text())
    }
  }

  async getOrder() {
    const res = await fetch(`http://localhost:3000/getorderandtime?order_id=${this.order_id}`, {
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
}
