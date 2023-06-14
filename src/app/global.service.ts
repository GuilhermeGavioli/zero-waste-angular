import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public APIURL: string = 'http://54.165.249.27:3000'
  // public APIURL: string = 'http://localhost:3000'

  constructor(private route: ActivatedRoute, private router: Router) { }
  last_route: string = 'perfil'
  my_route: string = 'perfil'

  initialize() {
    // Perform your initialization tasks here
    // For example, you can fetch some data from a server

  
  }

  public setMyRoute(route: string) {
    this.my_route = route;
    console.log(this.my_route)
  }


  public goTo(path: string) {
    const last_route = this.getLastRoute()
    this.setLastRoute(this.my_route);
    this.router.navigateByUrl(`/${path}`)
  }

  public getLastRoute() {
    return this.last_route;
  }

  public setLastRoute(route: string) {
    this.last_route = route;
  }

}
