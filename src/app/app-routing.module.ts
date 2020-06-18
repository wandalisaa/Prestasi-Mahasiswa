import { NgModule } from '@angular/core';
import { Routes, RouterModule, ParamMap } from '@angular/router';
import { BeststudentComponent } from './beststudent/beststudent.component';
import { AchieveComponent } from './achieve/achieve.component';
import { PostComponent } from './post/post.component';
import { UpdateComponent } from './update/update.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NewComponent } from './new/new.component';


const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'admin', component: BeststudentComponent },
  { path: 'index', component: AchieveComponent },
  { path: 'post/:id', component: PostComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'new', component: NewComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
  name: any;
  currentLang: string;
  constructor(
    private route: ActivatedRoute,
  ) {}


 }
