import {  AfterViewInit, Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import {ongs} from '../ongs';
import { slideToSide } from '../slideAnimation';

@Component({
  selector: 'app-pagina-ong',
  templateUrl: './pagina-ong.component.html',
  styleUrls: ['./pagina-ong.component.css'],
  animations: [slideToSide]
})
export class PaginaOngComponent implements AfterViewInit{
  constructor(private route: ActivatedRoute) { }
  percentage = 12;
  ongs = ongs;
  

  ngAfterViewInit() {

  }  




  ngOnInit() { 

  }

}
