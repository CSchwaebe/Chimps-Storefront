import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  //email = new FormControl('', [Validators.required, Validators.email]);
  FormGroup: FormGroup;
  constructor( private FormBuilder: FormBuilder) { 

    this.FormGroup = this.FormBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      message: ['', Validators.required],
    });

  }

  ngOnInit() {
  }

  onSubmit() {

  }

}
