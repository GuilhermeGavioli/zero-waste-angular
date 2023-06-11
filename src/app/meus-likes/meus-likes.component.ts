import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { slideToSide } from '../slideAnimation';

@Component({
  selector: 'app-meus-likes',
  templateUrl: './meus-likes.component.html',
  styleUrls: ['./meus-likes.component.css'],
  animations: [slideToSide]
})
export class MeusLikesComponent implements OnInit {

  public my_likes: any[] = [];
  public ids: any[] = [];

  constructor(private router: Router, private global: GlobalService, private route: ActivatedRoute) { }
  
  async ngOnInit() {
    this.route.url.subscribe((urlSegments: any) => {
      const routeName = urlSegments[urlSegments.length - 1].path;
      this.global.setMyRoute(routeName)
    });
    await this.getMyLikes()
    await this.getOngsInfo()
  }


  goTo(url: string) {
    this.global.goTo(url)
  }

  async getMyLikes() {
    const res = await fetch(`http://localhost:3000/mylikes`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      const data = await res.json();
      this.my_likes = data
      this.my_likes.forEach(like => { 
        this.ids.push(like.ong_id)
      })
      console.log(this.my_likes)
    }
  }

  public ongs: any = [];
  async getOngsInfo() {
    console.log(this.ids)
    const res = await fetch(`http://localhost:3000/getMyLikesOngInfo`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ ids: this.ids })
    });
    if (res.status === 200) {
      const data = await res.json(); 
      data.forEach((item: any) => { 
        this.ongs?.push({ ...item, liked: true })
      })
    } else {
      console.log(await res.text())
    }
    
  }


  async likeOng(ong_id: string, index: number){
    const res = await fetch(`http://localhost:3000/like?ong_id=${ong_id}`, {
      credentials: 'include',
      method: 'GET',
    })
    if (res.status === 200){
      this.ongs[index].liked = true;
      this.ongs[index].likes++;
    }
  }
  
  async unlikeOng(ong_id: string, index: number){
    const res = await fetch(`http://localhost:3000/unlike?ong_id=${ong_id}`, {
      credentials: 'include',
      method: 'GET',
    })
    if (res.status === 200){
      this.ongs[index].liked = false;
      this.ongs[index].likes--;
    }
  }

  
  goToOngPage(ong_id: string) {
    this.router.navigateByUrl(`/ong/${ong_id}`)
  }

}
