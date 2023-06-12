import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public APIURL: string = 'http://http://localhost:3000'

  constructor(private route: ActivatedRoute, private router: Router) { }
  last_route: string = 'perfil'
  my_route: string = 'perfil'

  initialize(): Promise<any> {
    // Perform your initialization tasks here
    // For example, you can fetch some data from a server

    return new Promise<any>((resolve, reject) => {
      // Simulating an asynchronous operation
      setTimeout(() => {
        // Resolve the promise when initialization is complete
        console.log('global test')
        resolve(true);
      }, 2000);
    });
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
