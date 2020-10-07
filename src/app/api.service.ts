import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { CodeTemps } from './codeTemps';
interface Page {
  items?: CodeTemps[];
  total?: number;
}
const URLFIRST = environment.urlFirst;
const URLSECOND = environment.urlSecond;
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private codeTempsSubject: Subject<CodeTemps[]> = new Subject<CodeTemps[]>();
  private total = 0;
  constructor(private http: HttpClient) { }

  public getCodeTemps(): Observable<CodeTemps[]> {
    return this.codeTempsSubject.asObservable();
  }

  public initCodeTemps(page: number, pageSize: number): void {
    this.http.get<Page>(URLFIRST + `get_code_temps/${page}/${pageSize}`).subscribe(page => {
      this.codeTempsSubject.next(page.items);
      this.total = page.total;
    });
  }

  public getCodeQr(qrCode: string, temp: string): Observable<Blob> {


    // to determine the Content-Type header
    const consumes: string[] = [
    ];


    return this.http.get(URLSECOND + `api/generator/qr-code/${qrCode}/${temp}`,
      { responseType: 'blob' }
    );
  }

  public addCode(codeInfoData: string, tempMuniteData: number): Observable<any> {
    const formData = new FormData();
    formData.append('code_info', codeInfoData);
    formData.append('temp_munite', tempMuniteData + '');

    return this.http.post<any>(URLFIRST + 'add_code_temps', formData);
  }

  public getTotal(): number {
    return this.total;
  }
}
