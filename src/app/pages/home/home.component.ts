import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { ApiService } from 'src/app/services/api/api.service';
import { flatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

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
    private api: ApiService,
    private dialog: MatDialog
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

  updatePost(post) {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      data: post
    });
    dialogRef.afterClosed().subscribe(response => {
      this.api.updatePost(response).subscribe(() => this.getAll());
    });
  }

}

// Dialog component
@Component({
  template: `
    <h1 mat-dialog-title>Update #{{component.id}}</h1>
    <div mat-dialog-content>
      <p>Header</p>
      <mat-form-field>
        <input matInput [(ngModel)]="component.Header">
      </mat-form-field>
    </div>
    <div mat-dialog-content>
      <p>Content</p>
      <mat-form-field>
        <input matInput [(ngModel)]="component.Content">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button [mat-dialog-close]="component" cdkFocusInitial>Update</button>
    </div>
  `,
})
export class UpdateDialogComponent {

  component: any;

  constructor(
    private dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.component = Object.assign({}, data);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
