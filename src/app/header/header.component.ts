import { Component, Input, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('sidebar') sidebar!: ElementRef;
  
  constructor(private router: Router, private authService: AuthService, private global: GlobalService) { }
  
  public is_sidebar_open: number = 0;

  @Input() logoutButton?: boolean = false;
  @Input() sidebarButton?: boolean = false;
  @Input() color?: boolean = true;
  @Input() backButton?: boolean = true;


  goBack() {
    const last_route = this.global.getLastRoute()
    this.global.goTo(last_route)
  }

  logout() {
    this.authService.logout()
  }

  openSidebar() {
    this.sidebar.nativeElement.style.left = '0'
    this.is_sidebar_open = 1
  }
  closeSidebar() {
    this.sidebar.nativeElement.style.left = '-90vw'
    this.is_sidebar_open = 0
  }
  toggleSidebar() {
    if (this.is_sidebar_open === 0) return this.openSidebar()
    this.closeSidebar()
  }

}
