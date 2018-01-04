import {Component, OnInit, ViewChild} from '@angular/core';
import {Signup} from '../signup';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
  model: Signup = new Signup();
  langs: string[] = [
    'English',
    'French',
    'German'
  ];

  @ViewChild('f')
  form: NgForm;

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted!');
      this.form.reset();
    }
  }
}
