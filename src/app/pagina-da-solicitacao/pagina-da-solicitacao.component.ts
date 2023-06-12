import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-pagina-da-solicitacao',
  templateUrl: './pagina-da-solicitacao.component.html',
  styleUrls: ['./pagina-da-solicitacao.component.css']
})
export class PaginaDaSolicitacaoComponent {
  constructor(private router: Router,  private global: GlobalService) {}
  goToPage(pageName:string){
   this.router.navigate([`${pageName}`]);
 }
}
