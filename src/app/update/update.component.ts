import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit, OnDestroy {
  id: string;
  users: any;

  warning = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }
  // tslint:disable-next-line: ban-types
  sub: any;
  // tslint:disable-next-line: ban-types
  prestasi: any;
  frmGroup: FormGroup;

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(async params => {
      this.prestasi = (await this.http.get('http://localhost:3000/api/prestasi/' + params.id).toPromise() as any[]);
      console.log(this.prestasi);
   });
  }
  kirim(data){

    console.log('http://localhost:3000/api/prestasi/' + this.prestasi._id);
    this.http.put('http://localhost:3000/api/prestasi/' + this.prestasi._id , data).toPromise();
    alert('Success');
    this.router.navigate(['/admin']);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
