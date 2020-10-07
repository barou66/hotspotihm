import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { CodeTemps } from './codeTemps';
import { saveAs } from 'file-saver';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddCodeTempComponent } from './add-code-temp/add-code-temp.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hotspotIHM';
  closeResult = '';

  page = 1;
  pageSize = 2;
  collectionSize = 0;
  codeTemps: CodeTemps[];


  constructor(private apiService: ApiService,

    private modalService: NgbModal) {

    this.refreshCodeTemps();
  }



  refreshCodeTemps() {
    this.apiService.initCodeTemps(this.page, this.pageSize);
    this.apiService.getCodeTemps().subscribe(codeTemps => {
      this.codeTemps = codeTemps;
    });
    this.collectionSize = this.apiService.getTotal();
  }

  getCodeQr(qrCode: string, temp: string) {
    this.apiService.getCodeQr(qrCode, temp).subscribe(blob => {
      saveAs(blob, qrCode + '.pdf',
        { type: 'application/pdf' }
      );
    });
  }

  open() {
    this.modalService.open(AddCodeTempComponent, {
      size: 'lg'
    });
  }


 

  onSubmit() {

  }

}
