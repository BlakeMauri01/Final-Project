import { Component, OnInit, Input } from '@angular/core';
import { Icecream } from '../icecream.model';

@Component({
  selector: 'app-icecream-item',
  templateUrl: './icecream-item.component.html',
  styleUrls: ['./icecream-item.component.css']
})
export class IcecreamItemComponent implements OnInit {
  @Input() icecream: Icecream;

  constructor() { }

  ngOnInit(): void {
  }

}
