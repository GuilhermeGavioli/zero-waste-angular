import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-conf-cc',
  templateUrl: './conf-cc.component.html',
  styleUrls: ['./conf-cc.component.css']
})
export class ConfCcComponent implements OnInit {


  constructor(private route: ActivatedRoute, private router: Router, private global: GlobalService){}
  
  public code_path: string | null = null
  public created: boolean = false;
  public loading: boolean = true;

  async ngOnInit(): Promise<void> {
    this.code_path = this.route.snapshot.paramMap.get('code_path') || null;    
    if (!this.code_path) this.router.navigateByUrl('/login');
    await this.fireConfirmation()
  }

  goTo(path: string) {
    
  }

  async fireConfirmation() {

    // this.showLoading()
    
      const res = await fetch(`http://localhost:3000/mfa?code_path=${this.code_path}`, {
        credentials: 'include',
        method: 'GET',
      });
      if (res.status === 200) {
        this.created = true;

        
      } else {
        console.log(await res.text())
        // this.denied_message = await res.text();
        // this.handleMessageAppearence();
      }
    this.loading = false;
      // this.hideLoading()

  }
    
}


