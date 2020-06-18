import { Component, OnInit } from '@angular/core';
import {  NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestasiService } from '../prestasi.service';

@Component({
  selector: 'app-beststudent',
  templateUrl: './beststudent.component.html',
  styleUrls: ['./beststudent.component.css']
})
export class BeststudentComponent implements OnInit {
  latest = [];
  key = '';
  warning = '';
  constructor(
    private http: HttpClient,
    private prestasiService: PrestasiService,
    private router: Router
  ) { }
  prestasilist = [];
  async ngOnInit(): Promise<void> {
    this.prestasilist = (await this.http.get('http://localhost:3000/api/prestasi').toPromise()) as any[];
    console.log(this.prestasilist);
    this.latest = (await this.http.get('http://localhost:3000/api/prestasi/latest').toPromise()) as any[];
    console.log(this.latest);
  }

  Delete(id: string) {
    if (confirm('Are you sure to delete this record')) {
      console.log('http://localhost:3000/api/prestasi/' + id);
      this.http.delete('http://localhost:3000/api/prestasi/' + id).toPromise();
      // tslint:disable-next-line: deprecation
      location.reload(true);
      alert('Delete Success!');
      this.ngOnInit();
    }
  }
  doupdate(id: string){
    this.router.navigate(['/update/', id]);
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
