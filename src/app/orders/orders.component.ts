import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { slideAnimation, slideToSide } from '../slideAnimation';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [slideAnimation, slideToSide]
})
export class OrdersComponent implements OnInit {


  @ViewChild('container') container!: ElementRef;
  
  public orders: any[] = []
  public order: any = null // opened ong info
  // public my_likes: any[] = []
  public current_pack: number = 1
  public is_over: number = 0

  public is_on_order_screen = 0;

  constructor(private router: Router) {
    
  }


  async ngOnInit(){
    await this.getFiveOrdersData()
    this.addEventListeners()
  }

  makeAppointment(order_id: string) {
    window.location.href = `/solicitacao/${order_id}`
  }

  async openOrder(i: number) {
    this.is_on_order_screen = 1
    
    this.order = this.orders[i]
    // this.order.orders = [];
    this.order.loading_orders = 1;
    // const res = await fetch(`http://localhost:3000/getordersfrom?ong_id=${this.orders[i]._id}`, {
    //   credentials: 'include',
    //   method: 'GET',
    // })
    // const data = await res.json()
    // console.log(data)
    // this.order.orders = data;
    this.order.loading_orders = 0;
  }


  closeOrder() {
    this.is_on_order_screen = 0
    this.order = null;
  }

  private lastScrollPosition: number = 0;
  private recently_fired: number = 0;
  addEventListeners() {
    this.container.nativeElement.addEventListener('scroll', async (event: Event) => {
      const el = event.target as HTMLElement;
      const currentScrollPosition = this.container.nativeElement.scrollTop;

      this.lastScrollPosition = currentScrollPosition;
      if ((el.scrollHeight - el.scrollTop) <= (el.clientHeight + 150)) {
        if (this.recently_fired === 0) {
          this.recently_fired = 1;
          await this.getFiveOrdersData()
          this.recently_fired = 0;
        }
      }
      
     })
  }

  async getFiveOrdersData() {
    if (this.is_over === 1) return;
    const res = await fetch(`http://localhost:3000/gettenorders?pack=${this.current_pack}`, {
      credentials: 'include',
      method: 'GET',
    })
    const data = await res.json()
    if (res.status === 200) { 
      if (data.data) {
        
        for (let i = 0; i < data.data?.length; i++) {
          data.data[i].sum_items = 0 
          data.data[i].sum_donated = 0 
          for (let j = 0; j < data.data[i].items?.length; j++) {
            data.data[i].sum_items += data.data[i].items[j]
            data.data[i].sum_donated += data.data[i].donated[j]
          }
        }
        this.orders.push(...data.data)
        this.current_pack++;
        console.log(this.orders)
      } else {
        this.is_over = 1;
      }
    }
  }

  async likeOng(ong_id: string, index: number){
   
  }
  
  async unlikeOng(ong_id: string, index: number){
 
  }

  async getMyLikes() {
  
  }

  navigateTo(url: string): void {
    this.router.navigateByUrl(url);
  }
}
