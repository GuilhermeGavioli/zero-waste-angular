import { Component, Input, ViewChild, ElementRef  } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('sidebar') sidebar!: ElementRef;
  public is_sidebar_open: number = 0;

  @Input() logoutButton: boolean = false;
  @Input() sidebarButton: boolean = false;



  openSidebar() {
    this.sidebar.nativeElement.style.left = '0'
    this.is_sidebar_open = 1
  }
  closeSidebar() {
    this.sidebar.nativeElement.style.left = '-80vw'
    this.is_sidebar_open = 0
  }
  toggleSidebar() {
    if (this.is_sidebar_open === 0) return this.openSidebar()
    this.closeSidebar()
  }
}
