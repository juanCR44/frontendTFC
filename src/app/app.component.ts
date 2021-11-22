import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import * as $ from "jquery";
import { FormBuilder, FormGroup } from '@angular/forms';


$(document).ready(function () {
  $('.enfermedad').click(function () {
    if ($(this).attr('class')?.split(' ').length === 1) {
      $(this).addClass('color')
    }
    else {
      $(this).removeClass('color')
    }
  });
});


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titulo = '';
  post = '';
  fileString = '';
  buttonVisible = false;
  msg: string = '';
  uploadForm!: FormGroup;
  listaSintoma: string[] = [];

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }

  changeListener($event: Event): void {
    this.readThis($event.target)
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
  }


  seleccionSintoma(sintoma: string) {
    const contenido = this.listaSintoma.indexOf(sintoma);
    if (contenido > -1) {
      this.listaSintoma.splice(contenido, 1);
    }
    else{
      this.listaSintoma.push(sintoma)
    }
  }
}
