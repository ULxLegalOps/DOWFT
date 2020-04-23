import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './file-upload.service';  

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }
  largeFileUpload(event: any) {  
    let fileList: FileList = event.target.files;  
    if (fileList.length != 0) {  
      this.fileUploadService.fileUpload(fileList[0], "Test_ABC", fileList[0].name).then(addFileToFolder => {  
        console.log("Large File Uploaded Successfully");  
      }).catch(error => {  
        console.log("Error while uploading" + error);  
      });  
    }  
  }  
}  
