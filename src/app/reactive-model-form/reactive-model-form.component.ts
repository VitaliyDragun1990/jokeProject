import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';

@Component({
  selector: 'app-reactive-model-form',
  templateUrl: './reactive-model-form.component.html',
  styleUrls: ['./reactive-model-form.component.css']
})
export class ReactiveModelFormComponent implements OnInit {
  searchField: FormControl;
  searches: string[] = [];

  constructor() { }

  ngOnInit() {
    this.searchField = new FormControl();
    this.searchField.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        filter(term => term.length > 1)
      )
      .subscribe(term => {
        this.searches.push(term);
      });
  }

}
