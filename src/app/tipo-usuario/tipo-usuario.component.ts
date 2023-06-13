import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppModule } from '../app.module';
import { slideToSide } from '../slideAnimation';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styleUrls: ['./tipo-usuario.component.css'],
  animations: [slideToSide]
})
  
export class TipoUsuarioComponent {

  constructor(private router: Router) { }
  
  goTo(path:string){
    this.router.navigateByUrl(`/${path}`)
  }
}
