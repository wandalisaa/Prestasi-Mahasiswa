import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(private http: HttpClient) { }

  mahasiswa = '';
  prestasi = '';
  tanggal = '';
  level = '';
  tempat = '';
  deskripsi = '';
  image = '';
  warning = '';

  ngOnInit(): void {
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
      this.warning = 'Please input Achievement';
    }else if (!this.tanggal){
      this.warning = 'Please input Date';
    }else if (!this.mahasiswa){
      this.warning = 'Please input Name of Student';
    }else if (!this.deskripsi){
      this.warning = 'Please input Detail';
    }else if (!this.level){
      this.warning = 'Please input Scale';
    }else if (!this.tempat){
      this.warning = 'Please input Place';
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
