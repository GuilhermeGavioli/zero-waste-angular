import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { slideToSide } from '../slideAnimation';

@Component({
  selector: 'app-meus-likes',
  templateUrl: './meus-likes.component.html',
  styleUrls: ['./meus-likes.component.css'],
  animations: [slideToSide]
})
export class MeusLikesComponent implements OnInit {

  public my_likes: any[] = [];

  constructor(private router: Router) { }
  
  async ngOnInit() {
      await this.getMyLikes()
  }

  async getMyLikes() {
    const res = await fetch(`http://localhost:3000/mylikes`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      // this.my_likes = await res.json();
      console.log(this.my_likes)
    }
  }

  goTo(url: string){
    this.router.navigateByUrl(`/${url}`)
  }

}
