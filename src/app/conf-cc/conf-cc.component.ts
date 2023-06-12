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
    this.router.navigateByUrl(`/${path}`)
  }


  public message: string = ''
  async fireConfirmation() {

    // this.showLoading()
    
      const res = await fetch(`${this.global.APIURL}/mfa?code_path=${this.code_path}`, {
        credentials: 'include',
        method: 'GET',
      });
      if (res.status === 200) {
        this.created = true;
        this.message = 'Bem-Vindo ao ZeroWaste, sua conta foi criada com Sucesso!'
        this.loading = false;
        
      } else {
        this.loading = false;
        this.message = await res.text()
        // this.denied_message = await res.text();
        // this.handleMessageAppearence();
      }
    this.loading = false;
      // this.hideLoading()

  }
    
}


