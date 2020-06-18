import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  prestasi: any;
  id: number;
  sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
    this.sub = this.route.params.subscribe(async params => {
      this.prestasi = (await this.http.get('http://localhost:3000/api/prestasi/' + params.id).toPromise() as any[]);
      console.log(this.prestasi);
   });
}

}
