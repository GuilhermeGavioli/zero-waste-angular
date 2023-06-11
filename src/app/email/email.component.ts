import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { slideAnimation } from '../slideAnimation';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  animations: [slideAnimation]
})
export class EmailComponent implements OnInit {

  public email: string = ''

  constructor(private route: ActivatedRoute, private router: Router, private global: GlobalService){}
  
  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email') || '';    
    if (!this.email) this.router.navigateByUrl('/login');
  }
}
