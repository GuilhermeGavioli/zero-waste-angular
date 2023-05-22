import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-alimento',
  templateUrl: './add-alimento.component.html',
  styleUrls: ['./add-alimento.component.css']
})
export class AddAlimentoComponent {
  constructor(private router: Router) {}
  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  private items = [0, 0, 0, 0, 0, 0, 150]
  public description: string = ''
  public name: string = ''


  async createOrder() {
    const res = await fetch(`http://localhost:3000/createorder`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({items: this.items, expires_in: 'threedays', name: this.name, description: this.description})
    });
    if (res.status === 200) {
      alert('ok')
    }
  }

}
