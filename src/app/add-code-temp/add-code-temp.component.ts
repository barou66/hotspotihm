import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

const URLFIRST = environment.urlFirst;
@Component({
  selector: 'app-add-code-temp',
  templateUrl: './add-code-temp.component.html',
  styleUrls: ['./add-code-temp.component.scss']
})
export class AddCodeTempComponent implements OnInit {
  public codeTempForm: FormGroup;
  codeInfo: FormControl;
  tempMunite: FormControl;
  codeInfoData = '';
  tempMuniteData = 0;

  constructor(public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.codeInfoData = this.getUniqueId();
    this.codeInfo = new FormControl({ value: this.codeInfoData, disabled: true }, [Validators.required]);
    this.tempMunite = new FormControl('', [Validators.required, Validators.min(5), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]);
    this.codeTempForm = this.fb.group({
      codeInfo: this.codeInfo,
      tempMunite: this.tempMunite
    });
  }

  validateCodeInfo(): boolean {
    return this.codeInfo.valid || this.codeInfo.untouched;
  }

  validateTempMunite(): boolean {
    return this.tempMunite.valid || this.tempMunite.untouched;
  }

  onSubmit() {
    this.tempMuniteData = this.tempMunite.value;

    this.apiService.addCode(this.codeInfoData, this.tempMuniteData).subscribe(
      data => {
        alert(data.message);
        this.apiService.initCodeTemps(1, 5);
        this.activeModal.dismiss('Cross click');
      },
      error => {
        alert('OOuupppssss!!! ' + error);
      }

    );
  }

  getUniqueId(): string {
    const stringArr = [];
    for (let i = 0; i < 2; i++) {
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }

}
