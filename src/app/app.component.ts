import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import * as $ from "jquery";
import { FormBuilder, FormGroup } from '@angular/forms';
import {fakeAsync} from "@angular/core/testing";
import {Response} from "./services/response";

$(document).ready(function () {
  $('.enfermedad').click(function () {
    if ($(this).attr('class')?.split(' ').length === 1) {
      $(this).addClass('color')
    }
    else {
      $(this).removeClass('color')
    }
  });

  $("#back-button").click(function(){
    $("#message").removeClass("show");
  })

  $("#message").click(function(){
    $("#message").removeClass("show");
  })

});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';
  post = '';
  buttonVisible = false;
  downloadVisible = false;
  msg: string = '';
  uploadForm!: FormGroup;
  listaSintoma: string[] = [];
  send = false;
  showMessage = false;
  message = '';

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }

  changeListener($event: Event): void {
    this.readThis($event.target)
  }

  listaVacia(): boolean{
    return this.listaSintoma.length == 0;
  }

  readThis(inputValue: any) {
    var file = inputValue.files[0];
    this.uploadForm.get('profile')!.setValue(file);
    this.buttonVisible = true;
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile')!.value);

    this.userService.addFile(formData).subscribe(r => console.log(r));

    this.userService.addFile(formData).subscribe(r => console.log(r));
    this.downloadVisible = true;
  }


  seleccionSintoma(sintoma: string) {
    const contenido = this.listaSintoma.indexOf(sintoma);
    if (contenido > -1) {
      this.listaSintoma.splice(contenido, 1);
    }
    else {
      this.listaSintoma.push(sintoma)
    }
    console.log(this.listaSintoma)
    this.send = !this.listaVacia();
    console.log("send",this.send)
  }


  enviarSintoma() {

    this.userService.enviarSintoma(this.listaSintoma).subscribe(
      (res: Response) => {
        this.showMessage = true
        this.message = res.response
        console.log(res.response)
      },
      err => {
        console.log(err);
      }
    );
  }

}
