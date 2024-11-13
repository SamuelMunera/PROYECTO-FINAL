import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ServiceModel } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})


export class FormServiceService {

  formVisibility = signal(true);

  constructor() { }

}
