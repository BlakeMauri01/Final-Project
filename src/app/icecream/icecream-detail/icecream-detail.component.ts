import { Component, OnInit } from '@angular/core';
import { Icecream } from '../icecream.model';
import { IcecreamService } from '../icecream.service'
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-icecream-detail',
  templateUrl: './icecream-detail.component.html',
  styleUrls: ['./icecream-detail.component.css']
})
export class IcecreamDetailComponent implements OnInit {
  icecream: Icecream;
  id: string;

  constructor(
    private icecreamService: IcecreamService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.icecream = this.icecreamService.getIcecream(this.id);
      }
    );
  }

  onDelete() {
    this.icecreamService.deleteIcecream(this.icecream);
    this.router.navigateByUrl('/icecream');
  }

}
