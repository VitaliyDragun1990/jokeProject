import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.css']
})
export class ModelFormComponent implements OnInit {
  langs: string[] = [
    'English',
    'French',
    'German'
  ];
  myForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  language: FormControl;

  constructor() {
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log('Form Submitted!');
      this.myForm.reset();
    }
  }

  private createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[^@]*@[^@]*')
    ]);
    this.password = new FormControl('', [
      Validators.minLength(8),
      Validators.required
    ]);
    this.language = new FormControl();
  }

  private createForm() {
    this.myForm = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName
      }),
      email: this.email,
      password: this.password,
      language: this.language
    });
  }
}
