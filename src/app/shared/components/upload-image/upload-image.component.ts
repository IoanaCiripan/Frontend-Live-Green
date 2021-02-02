import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent implements OnInit {
  constructor() {}
  @Output() onFileUpload = new EventEmitter<any>();

  onlyOneFile: Boolean = false;
  isJpgFile: Boolean = false;
  replacedFile: Boolean = false;
  messageList = [];
  files: any[] = [];

  ngOnInit(): void {}
  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  checkFile(item) {
    const re = /(?:\.([^.]+))?$/;

    return re.exec(item.name)[1] === 'jpg';
  }
  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
    this.onlyOneFile = false;
    this.isJpgFile = false;
    this.replacedFile = false;
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: FileList) {
    this.onlyOneFile = false;
    this.isJpgFile = false;
    this.replacedFile = false;

    if (files.length > 1) {
      this.onlyOneFile = true;
      return;
    }

    if (!this.checkFile(files.item(0))) {
      this.isJpgFile = true;
      return;
    }

    if (this.files.length === 1) {
      this.replacedFile = true;
    }

    this.files = [];
    // this.onlyOneFile = true;
    this.files.push(files.item(0));
    this.onFileUpload.emit(this.files[0]);
    // this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
