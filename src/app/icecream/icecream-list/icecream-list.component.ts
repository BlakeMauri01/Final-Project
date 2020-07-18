import { Component, OnInit, OnDestroy } from '@angular/core';
import { Icecream } from '../icecream.model';
import { IcecreamService } from '../icecream.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-icecream-list',
  templateUrl: './icecream-list.component.html',
  styleUrls: ['./icecream-list.component.css']
})
export class IcecreamListComponent implements OnInit, OnDestroy {
  icecreams: Icecream[] = [];
  subscription: Subscription;
  term: string;

  constructor(private icecreamService: IcecreamService) { }

  ngOnInit() {
    this.subscription = this.icecreamService.icecreamListChangedEvent.subscribe(
      (icecreams: Icecream[]) => {
        this.icecreams = icecreams
      }
    );

    this.icecreamService.getIcecreams();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onKeyPress(value: string) {
    this.term = value;
  }
}
