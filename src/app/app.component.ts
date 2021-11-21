import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  downloadVisible = false;
  msg: string = '';
  uploadForm!: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    /*this.userService.getMsg().subscribe(res => {
      this.msg = JSON.stringify(res);
    })*/

    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }
/*
  addPost() {
    this.userService.addPost({ title: this.titulo, post: this.post }).subscribe(res => console.log(res))
  }
*/
  changeListener($event: Event): void {
    this.readThis($event.target)
  }

  readThis(inputValue: any) {
    var file = inputValue.files[0];
    this.uploadForm.get('profile')!.setValue(file);
    this.buttonVisible = true;
/*
    var myReader: FileReader = new FileReader();
    var fileType = inputValue.parentElement.id;
    myReader.onloadend = (e) => {
      this.fileString = myReader.result as string;
      this.buttonVisible = true;
   };

    myReader.readAsText(file);*/
  }

  uploadFile(){
    //this.userService.addFile(this.fileString).subscribe(r =>console.log(r));
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile')!.value);
    this.userService.addFile(formData).subscribe(r=>console.log(r));
    this.downloadVisible = true;
    /*this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );*/
  }

}
