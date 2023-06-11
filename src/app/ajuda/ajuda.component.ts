import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { slideToSide, slideToSideFromRight, slideAnimationWithLeave} from '../slideAnimation';

@Component({
  selector: 'app-ajuda',
  templateUrl: './ajuda.component.html',
  styleUrls: ['./ajuda.component.css'],
  animations: [slideToSide, slideToSideFromRight, slideAnimationWithLeave]
})
export class AjudaComponent implements OnInit {

  public state: number = 1;
  constructor(private router: Router, private global: GlobalService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.url.subscribe((urlSegments: any) => {
      const routeName = urlSegments[urlSegments.length - 1].path;
      this.global.setLastRoute(routeName)
    });
  }
  

  goTo(path: string) {
    this.router.navigateByUrl(`${path}`)
  }

}
