import { Component, OnInit } from '@angular/core';
import {  NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestasiService } from '../prestasi.service';

@Component({
  selector: 'app-achieve',
  templateUrl: './achieve.component.html',
  styleUrls: ['./achieve.component.css']
})
export class AchieveComponent implements OnInit {
  prestasilist = [];
  latest = [];
  key = '';
  warning = '';

  constructor(
    private http: HttpClient,
    private prestasiService: PrestasiService,
    private router: Router
    ){}

  async ngOnInit(): Promise < void > {
    this.prestasilist = (await this.http.get('http://localhost:3000/api/prestasi').toPromise()) as any[];
    console.log(this.prestasilist);
    this.latest = (await this.http.get('http://localhost:3000/api/prestasi/latest').toPromise()) as any[];
    console.log(this.latest);
  }

  async search(){
    if (this.validation()){
    this.prestasilist = (await this.http.get('http://localhost:3000/api/prestasi/search/' + this.key).toPromise()) as any[];
    }
  }

  validation(){
    if (!this.key){
      this.warning = 'Masukan kata kunci';
    }else{
      this.warning = '';
    }
    return this.key;
  }

  async sortbyDate(){
    this.prestasilist = (await this.http.get('http://localhost:3000/api/prestasi/latestall').toPromise()) as any[];
  }
  async sortbyScale(){
    this.prestasilist = (await this.http.get('http://localhost:3000/api/prestasi/scale').toPromise()) as any[];
  }
}

