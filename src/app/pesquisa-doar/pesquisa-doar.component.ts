import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { slideAnimation, slideToSide } from '../slideAnimation';

@Component({
  selector: 'app-pesquisa-doar',
  templateUrl: './pesquisa-doar.component.html',
  styleUrls: ['./pesquisa-doar.component.css'],
  animations: [slideAnimation, slideToSide]
})
export class PesquisaDoarComponent implements OnInit {

  @ViewChild('container') container!: ElementRef;
  @ViewChild('ErrorMessage') ErrorMessage!: ElementRef;
  
  public ongs: any[] = []
  public ong: any = null // opened ong info
  public my_likes: any[] = []
  public current_pack: number = 1
  public is_over: number = 0
  public ong_active_orders: any;



  public is_on_ong_screen = 0;

  constructor(private router: Router, private global: GlobalService) {
    
  }


  async ngOnInit(){
    await this.getMyLikes()
    await this.getFiveOngsData()
    this.addEventListeners()
  }

  makeAppointment(order_id: string) {
    window.location.href = `/solicitacao/${order_id}`
  }

  goToOrderPage(order_id: string) {
    this.router.navigateByUrl(`/solicitacao/${order_id}`)
  }

  async openOng(i: number) {
    this.is_on_ong_screen = 1
    this.ong = this.ongs[i]
    this.ong.orders = [];
    this.ong.loading_orders = 1;
    const res = await fetch(`${this.global.APIURL}/getactiveordersfrom?ong_id=${this.ongs[i]._id}`, {
      credentials: 'include',
      method: 'GET',
    })
    const data = await res.json()
    if (!data) return
    for (let i = 0; i < data?.length; i++) {
      data[i].sum_items = 0
      data[i].sum_donated = 0
      for (let j = 0; j < data[i].items?.length; j++) {
        data[i].sum_items += data[i].items[j]
        data[i].sum_donated += data[i].donated[j]
      }
    }

    this.ong_active_orders = data;
    this.ong.loading_orders = 0;
  }


  closeOng() {
    this.is_on_ong_screen = 0
    this.ong = null;
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
          await this.getFiveOngsData()
          this.recently_fired = 0;
        }
      }
      
     })
  }

  goBackToOngs() {
    this.is_on_ong_screen = 0;
    setTimeout(() => {
      this.addEventListeners()
      this.container.nativeElement.scrollTop = this.lastScrollPosition;
    }, 250);
  }

  async getFiveOngsData() {
    if (this.is_over === 1) return;
    const res = await fetch(`${this.global.APIURL}/gettenongs?pack=${this.current_pack}`, {
      credentials: 'include',
      method: 'GET',
    })
    const data = await res.json()
    if (res.status === 200) { 
      if (data.data){
        console.log(data)
        for(let i = 0; i < data?.data?.length; i++){
          const idExistsInMyLikes = this.my_likes.some(like => like?.ong_id === data.data[i]._id);
          if (idExistsInMyLikes){
            data.data[i].liked = true;
          }
          data.data[i].likes = data.likes[`${data.data[i]._id}`] || 0
          this.ongs.push(data.data[i])
        }
        console.log(this.ongs)
        this.current_pack++;
      } else {
        this.is_over = 1;
      }
    }
  }

  public weekdays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']
  public possible_items = ['Farinhas e Amidos', 'Conservas', 'Óleos e Gorduras', 'Leites e Derivados', 'Sucos e Bebidas', 'Grãos e Cereais', 'Enlatados']

  async likeOng(ong_id: string, index: number){
    const res = await fetch(`${this.global.APIURL}/like?ong_id=${ong_id}`, {
      credentials: 'include',
      method: 'GET',
    })
    if (res.status === 200){
      this.ongs[index].liked = true;
      this.ongs[index].likes++;
    }
  }
  
  async unlikeOng(ong_id: string, index: number){
    const res = await fetch(`${this.global.APIURL}/unlike?ong_id=${ong_id}`, {
      credentials: 'include',
      method: 'GET',
    })
    if (res.status === 200){
      this.ongs[index].liked = false;
      this.ongs[index].likes--;
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

  navigateTo(url: string): void {
    this.router.navigateByUrl(url);
  }




  public loading: boolean = false;
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
    //  this.AppointmentButton.nativeElement.disabled = true
   }
 
   hideLoading() {
     this.loading = false
    //  this.AppointmentButton.nativeElement.disabled = false
   }

}
