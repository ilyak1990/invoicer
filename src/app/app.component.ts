import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    // this.http.get("http://localhost:3000/hello", {responseType: 'text'}).subscribe((response) => {
    // console.log(response)  
    // this.title = response;
    // })
  }
  title = 'FrontEndApp';

}
