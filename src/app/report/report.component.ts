import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { slideToSide } from '../slideAnimation';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  animations: [slideToSide]
})
export class ReportComponent {

  constructor(private router: Router) { }
  

  public loading: boolean = false;
  public denied_message: string = '' 
  public topic: string = '' 
  public issue: string = ''
  
  report() {
    
  }

  goBack() {
    this.router.navigateByUrl('/perfil')
  }

}
