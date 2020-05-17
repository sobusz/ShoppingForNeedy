// dashboard.page.ts
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userEmail: string;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService
  ) { }

  ngOnInit() {

    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })

    // -- get data from database -- 
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    var imie_nazwisko = (snapshot.val() && snapshot.val().imie_nazwisko) || 'Anonymous';
    var nr_telefonu = (snapshot.val() && snapshot.val().nr_telefonu) || 'Anonymous';
    console.log("test",imie_nazwisko);
    console.log("test",nr_telefonu);
    // -- get data from database --
});

  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }
}