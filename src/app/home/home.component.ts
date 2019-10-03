import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public users: any[] = [];
  public incidents: any[] = [];

  constructor(
    private http: HttpClient) { }

  ngOnInit() {
    this.getUsers();
    this.getIncidents();
  }

  getUsers() {
    this.http.get<any>('/api/now/table/sys_user?sysparm_fields=first_name,last_name,email,sys_created_on').subscribe(res => {
      this.users = res.result.map(user => {
        user.sys_created_on = new Date(user.sys_created_on);
        return user;
      }).sort((a, b) => `${a.first_name}${a.last_name}` < `${b.first_name}${b.last_name}` ? - 1 : 1);
    });
  }

  getIncidents(){
    this.http.get<any>('/api/now/v1/table/incident').subscribe(res => {
      this.incidents = res.result.map(incident => {
        incident.sys_updated_on = new Date(incident.sys_updated_on);
        return incident;
      })
    });
  }
}
