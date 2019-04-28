import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { AppService } from "../app.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  public logo: string = '';
  public links = [];

  constructor(
    public router: Router,
    private service: AppService
  ) {
    router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        const path = event.url.substring(event.url.lastIndexOf("/") + 1, event.url.lastIndexOf("/"));
        this.service.setViewConfig('dashboard');
        this.links.forEach(l => l.active = l.route === event.url);
      }
    });
  }

  ngOnInit(): void {
    this.service.getNavLinks().subscribe(links => this.links = links);
  }

  handleClick(link): void {
    if (link.callback) {
      this[link.callback]();
    } else {
      this.router.navigate([link.route]);
    }
  }
}
