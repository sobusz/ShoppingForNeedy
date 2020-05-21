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

  }
// -- write to databse -- 
  test() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = firebase.auth().currentUser.uid;

        let input = (document.getElementById('testXD') as HTMLInputElement).value;
        writeUserData(userId, input)
      } else {
        // No user is signed in.
      }
    });

    function writeUserData(userId, name) {
      firebase.database().ref('/users/' + userId).set({
        username: name,
      });
    }
  }
// --end: write to databse -- 

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