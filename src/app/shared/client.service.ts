import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './client';

@Injectable()
export class ClientService {
  private apiUrl = 'api/clients';
  constructor(private httpClient: HttpClient) { }

  getClients(): Observable<Client[]>{
    return this.httpClient.get<Client[]>(this.apiUrl);
  }
}
