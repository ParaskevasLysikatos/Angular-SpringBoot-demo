import { HttpClient, HttpHeaders, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, Subject, take } from 'rxjs';
import { Company } from '../interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

readonly url="http://localhost:8080/api/companies"

 httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
});

  constructor(
    private httpClient: HttpClient,
  ) { }

  deleteAllComEvent = new Subject<boolean>();

  public getAllCompanies(): Observable<Company[]> {
    return this.httpClient
      .get<Company[]>(`${this.url}`,{headers:this.httpHeaders})
      .pipe(take(1),shareReplay());
  }

  public getCompany(id:number): Observable<Company> {
    return this.httpClient
      .get<Company>(`${this.url}/`+id,{headers:this.httpHeaders})
      .pipe(take(1));
  }

  public deleteAllCompanies(): Observable<HttpStatusCode> {
    return this.httpClient
      .delete<HttpStatusCode>(`${this.url}`,{headers:this.httpHeaders})
      .pipe(take(1));
  }

  public deleteCompany(id:number): Observable<HttpStatusCode> {
    return this.httpClient
      .delete<HttpStatusCode>(`${this.url}/`+id,{headers:this.httpHeaders})
      .pipe(take(1));
  }

  public createCompany(company:Company): Observable<Company> {
    return this.httpClient
      .post<Company>(`${this.url}`,{...company},{headers:this.httpHeaders})
      .pipe(take(1));
  }

  public editCompany(company:Company,id:number): Observable<Company> {
    return this.httpClient
      .put<Company>(`${this.url}/`+id,{...company},{headers:this.httpHeaders})
      .pipe(take(1));
  }

}
