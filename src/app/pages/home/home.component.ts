import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { ApiService } from 'src/app/services/api/api.service';
import { flatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data = {
    title: 'Hello',
    message: 'Hello World'
  };

  posts = [];

  constructor(
    private usse: LoginService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.usse.getUserSession().subscribe();
    this.getAll();
  }

  sendData() {
    const data = {
      Header: this.data.title,
      Content: this.data.message,
      Latitude: 0,
      Longitude: 0,
      Legacy: 0,
    };
    this.api.newPost(data).subscribe(() => {
      this.data.title = '';
      this.data.message = '';
      this.getAll();
    });
  }

  getAll() {
    this.api.getPost().pipe(
      flatMap((response: any) => {
        this.posts = response;
        return of (EMPTY);
      })
    ).subscribe();
  }

  deletePost(post) {
    this.api.deletePost(post.id).subscribe(() => this.getAll());
  }

}
