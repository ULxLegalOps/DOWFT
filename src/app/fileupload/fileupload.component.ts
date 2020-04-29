import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './file-upload.service'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 
@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  selectedFile: File;
  productForm: FormGroup;
  imgFront;
  imgBack;
  SharepointUrl:any;
  test:any;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.productForm = this.fb.group({
      Title: ['', [Validators.required]]
    });
  }

  private onUpload() {
    const fd = new FormData();
    this.SharepointUrl="http://localhost:8080/sites/ContractRoomDataOps/_api/web/lists/getByTitle('DataOps')/Items(1444)/AttachmentFiles/add(FileName='" +this.selectedFile.name+ "')";
    fd.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.http.post(this.SharepointUrl, fd)
      .subscribe(res =>{
        this.test = res;
        console.log("response data attachment" + this.test);
      });
  }

  onFormSubmit() {
    const formData = {
      ...this.productForm.value,
      imgFront: this.imgFront,
      imgBack: this.imgBack
    };
    console.log('Form Data', formData);
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.onUpload();
  }

}  
