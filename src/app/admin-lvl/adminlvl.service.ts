import { Injectable } from '@angular/core';
import {ApiService} from '../api.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, ROUTES } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { AdminlvlComponent } from './adminlvl.component';
import { AppConfig } from '../app.config';


@Injectable({
    providedIn: 'root' // just before your class
  })



export class AdminlvlService {
    // url= 'http://localhost:8010/admin-level';

    baseUrl: string = AppConfig.baseUrl;
    url= this.baseUrl+'admin-level';

    
constructor(private http: HttpClient) {}

   
    create(data: any) {
        // console.log(data);
        return this.http.post(this.url,data);
        
    }
    update(id: any, data: any) {
        return this.http.put(this.url + '/' + id, data);
        // return this.api.update(this.path,id,data);
    }

    getList(perPage: string | number, page: string | number, searchTerm?: string, sortKey?: string, sortDir?: boolean) {

        let urlPart = '?perPage=' + perPage + '&page=' + page;
        if (typeof searchTerm !== 'undefined' || searchTerm !== '') {
            urlPart += '&searchOption=all&searchTerm=' + searchTerm;
        }
        if (typeof sortKey !== 'undefined' || sortKey !== '') {
            urlPart += '&sortKey=' + sortKey;
        }
        if (typeof sortDir !== 'undefined' && sortKey !== '') {
            if (sortDir) {
                urlPart += '&sortDir=desc';
            } else {
                urlPart += '&sortDir=asc';
            }
        }
        return this.http.get(this.url + urlPart);
        
    }



    getEdit(id: string) {
        return this.http.get(this.url + '/' + id);
        
    }
    remove(id: string) {
        return this.http.delete(this.url + '/' + id);
        
    }
   
}
