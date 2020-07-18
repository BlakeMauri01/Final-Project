import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Icecream } from '../icecream.model';
import { IcecreamService } from '../icecream.service';

@Component({
  selector: 'app-icecream-edit',
  templateUrl: './icecream-edit.component.html',
  styleUrls: ['./icecream-edit.component.css']
})
export class IcecreamEditComponent implements OnInit {
  originalIcecream: Icecream;
  icecream: Icecream;
  groupIcecreams: Icecream[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private icecreamService: IcecreamService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.originalIcecream = this.icecreamService.getIcecream(this.id);

      if (!this.originalIcecream) {
        return;
      }

      this.editMode = true;
      this.icecream = JSON.parse(JSON.stringify(this.originalIcecream));

      if (
        this.originalIcecream.group &&
        this.originalIcecream.group.length > 0
      ) {
        this.groupIcecreams = JSON.parse(
          JSON.stringify(this.originalIcecream.group)
        )
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIcecream = new Icecream(
      '',
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupIcecreams
    );

    if (this.editMode) {
      this.icecreamService.updateIcecream(this.originalIcecream, newIcecream);
    } else {
      this.icecreamService.addIcecream(newIcecream);
    }

    this.router.navigate(['/icecream']);
  }

  onCancel() {
    this.router.navigate(['/icecream']);
  }

  onRemoveItem(i: number) {
    if (i < 0 || i >= this.groupIcecreams.length) {
      return;
    }
    this.groupIcecreams.splice(i, 1);
  }

  isInvalidIcecream(newIcecream: Icecream) {
    if (!newIcecream) {
      return true;
    }
    if (newIcecream.id === this.icecream.id) {
      return true;
    }

    for (let i = 0; i < this.groupIcecreams.length; i++) {
      if (newIcecream.id === this.groupIcecreams[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    let selectedIcecream: Icecream = $event.dragData;
    const invalidGroupIcecream = this.isInvalidIcecream(selectedIcecream);
    if (invalidGroupIcecream) {
      return;
    }
    this.groupIcecreams.push(selectedIcecream);
  }
}
