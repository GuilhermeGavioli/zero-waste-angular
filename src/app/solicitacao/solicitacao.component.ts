
  import { getLocaleExtraDayPeriods } from '@angular/common';
import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { slideAnimation } from '../slideAnimation';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.css'],
  animations: [slideAnimation]
})
export class SolicitacaoComponent {


  public order_id: string = ''
  public order: any | null;

  constructor(private route: ActivatedRoute, private router: Router){}
  
  async ngOnInit(): Promise<void> {
    this.order_id = this.route.snapshot.paramMap.get('order_id') || '';    
    if (!this.order_id) this.router.navigateByUrl('/perfil');
    await this.getOrder()
    console.log(this.order)
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
