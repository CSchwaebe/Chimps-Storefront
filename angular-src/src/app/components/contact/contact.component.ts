import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Message } from 'src/app/models/admin/message';
import { MessageService } from 'src/app/services/message.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  model: Message;
  FormGroup: FormGroup;
  messageSent: boolean = false;

  constructor( private FormBuilder: FormBuilder,
    private MessageService: MessageService,
    private SnackbarService: SnackbarService,
    private TitleService: TitleService
) { 
  this.TitleService.setTitle("Contact");
    window.scrollTo(0,0);

    this.FormGroup = this.FormBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      message: ['', Validators.required],
    });

  }

  ngOnInit() {
   
  }

  async onSubmit() {
    this.model = new Message();
    this.model.name = this.FormGroup.value.name;
    this.model.phone = this.FormGroup.value.phone;
    this.model.email = this.FormGroup.value.email;
    this.model.message = this.FormGroup.value.message;

    if (this.model.phone && this.model.name && this.model.email && this.model.message) {
      console.log(this.model)
      let response = await this.MessageService.post(this.model);
      if (response) {
        this.messageSent=true;
        this.clear();
        //this.Router.navigate(['/']);
      } else 
      this.SnackbarService.onError();

       
      

    } else { 
      this.SnackbarService.onError();
    }


  }

  clear() {
    this.FormGroup.reset();
  }

}
