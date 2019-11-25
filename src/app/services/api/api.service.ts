import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PresentationUrlEndpointInfo } from 'src/common/Http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  newPost(data) {
    return this.http.post(`${PresentationUrlEndpointInfo.baseUrl}/${PresentationUrlEndpointInfo.keys.post}`, data);
  }

  getPost() {
    return this.http.get(`${PresentationUrlEndpointInfo.baseUrl}/${PresentationUrlEndpointInfo.keys.post}`);
  }

  updatePost(data) {
    return this.http.put(`${PresentationUrlEndpointInfo.baseUrl}/${PresentationUrlEndpointInfo.keys.post}/${data.id}`, data);
  }

  deletePost(id: number) {
    return this.http.delete(`${PresentationUrlEndpointInfo.baseUrl}/${PresentationUrlEndpointInfo.keys.post}/${id}`);
  }
}
