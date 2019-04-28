import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverUrl: string= 'http://localhost:4000';

  constructor(
    private http: HttpClient
  ) { }

  setServerUrl(url) {
    this.serverUrl = url;
  }

  getData(dataSource) {
    return this.http.get(`${this.serverUrl}/dataSets/${dataSource}`).pipe(
      map(resp => resp['data']),
      catchError(error => {
        console.log(`Error fetching data from ${dataSource}`, error);
        return throwError(error);
      })
    );
  }

  createData(dataSource, data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.serverUrl}/dataSets/${dataSource}`, {id: dataSource, data: data}, {headers}).pipe(
      catchError(error => {
        console.log(`Error creating data to ${dataSource}`, error);
        return throwError(error);
      })
    );
  }

  updateData(dataSource, data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.serverUrl}/dataSets/${dataSource}`, {id: dataSource, data: data}, {headers}).pipe(
      map(resp => resp['data']),
      catchError(error => {
        console.log(`Error updating data to ${dataSource}`, error);
        return throwError(error);
      })
    );
  }

  deleteData(dataSource) {
    return this.http.delete(`${this.serverUrl}/dataSets/${dataSource}`).pipe(
      catchError(error => {
        console.log(`Error deleting data from ${dataSource}`, error);
        return throwError(error);
      })
    );
  }
}
