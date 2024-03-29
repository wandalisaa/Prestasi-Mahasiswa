import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) { }

  mahasiswa = '';
  prestasi = '';
  tanggal = '';
  level = '';
  tempat = '';
  deskripsi = '';
  image = '';
  warning = '';

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
    }

  kirim(){
    console.log(this.mahasiswa, this.prestasi);
    // tslint:disable-next-line: max-line-length
    if (this.validation()){
      this.http.post('http://localhost:3000/api/prestasi', {mahasiswa: this.mahasiswa,
     prestasi: this.prestasi, tanggal: this.tanggal, level: this.level,
     tempat: this.tempat, deskripsi: this.deskripsi, image: this.image}).toPromise();
      this.clear();
      alert('Success');
    }
  }

  validation(){
    if (!this.prestasi){
      this.warning = 'Tambahkan input prestasi';
    }else if (!this.tanggal){
      this.warning = 'Tambahkan tanggal';
    }else if (!this.mahasiswa){
      this.warning = 'Tambahkan nama mahasiswa';
    }else if (!this.deskripsi){
      this.warning = 'Tambahkan deskripsi';
    }else if (!this.level){
      this.warning = 'Tambahkan Taraf prestasi';
    }else if (!this.tempat){
      this.warning = 'Tambahkan nama kegiatan';
    }else{
      this.warning = '';
    }
    return this.prestasi && this.tanggal && this.mahasiswa && this.deskripsi && this.level && this.tempat ;
  }

  clear(){
    this.mahasiswa = '';
    this.prestasi = '';
    this.tanggal = '';
    this.level = '';
    this.tempat = '';
    this.deskripsi = '';
    this.image = '';
  }
}
