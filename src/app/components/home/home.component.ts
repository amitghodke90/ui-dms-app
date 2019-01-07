import {Component, EventEmitter, OnInit} from '@angular/core';
import {FileUploader, FileItem, FileUploaderOptions} from 'ng2-file-upload';
import {UploadService} from '../../services/upload.service';
import {NgClass, NgStyle} from '@angular/common';

function readBase64(file): Promise<any> {
  const reader = new FileReader();
  const future = new Promise((resolve, reject) => {
    reader.addEventListener('load', function () {
      resolve(reader.result);
    }, false);

    reader.addEventListener('error', function (event) {
      reject(event);
    }, false);

    reader.readAsDataURL(file);
  });
  return future;
}

const URL = 'http://localhost:10010/';

// const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // directives: [FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class HomeComponent implements OnInit {
  public searchKeyword = '';
  public uploader: FileUploader = new FileUploader({url: URL + 'doc', itemAlias: 'uploadFile'});

  public multiUploader: FileUploader = new FileUploader({url: URL + 'doc', itemAlias: 'uploadFile'});
  public mDocument;
  // public books;
  // public movies;
  public   filesToUpload: FileList ;

  constructor(private  uploadService: UploadService ) {
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      alert('File uploaded successfully');
    };

    this.multiUploader.onAfterAddingFile = (files) => {
      console.log('multi filesss', files);
      files.withCredentials = false;
    };
    this.multiUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      alert('File uploaded successfully' + item);
    };
  }

  search() {
    this.uploadService.searchDocument(this.searchKeyword).subscribe(
      data => {
        // if(data && data.hits && data.hits.data.length>0){
        //
        // }
        console.log('data', data);
        this.mDocument = data.hits.hits;
        console.log('ss', this.mDocument);
      }
      // No error or completion callbacks here. They are optional, but
      // you will get console errors if the Observable is in an error state.
    );
    console.log('searched');
  }

  downloadFile(name) {
    this.uploadService.downloadDocument(name).subscribe(
      data => {
        if (data) {
          window.open(JSON.parse(data).url, '_blank');
          console.log(typeof  JSON.parse(data).url);
          console.log(JSON.parse(data).url);
        }
      }
      // No error or completion callbacks here. They are optional, but
      // you will get console errors if the Observable is in an error state.
    );
  }

  uploadSingleFile() {
    this.uploader.uploadAll();
  }

  uploadMultipleFiles() {
    // console.log('muklti upload', this.multiUploader.getNotUploadedItems().length);
     this.multiUploader.uploadAll();
    console.log(this.filesToUpload);
    // for(let i = 0; i < this.filesToUpload.length; i++) {
    //   this.uploadService.uploadFile(this.filesToUpload[i])
    //     .subscribe(res => console.log('res', res));
    //   // formData.append('uploads[]', files[i], files[i]['name']);
    // }
    // console.log('form data variable :'+ formData.toString());

  }
  fileChangeEvent(fileInput) {
    // this.filesToUpload = <Array<File>>fileInput.target.files;
    this.filesToUpload = fileInput.target.files;
    console.log(fileInput);
    // this.product.photo = fileInput.target.files[0]['name'];
  }

}
