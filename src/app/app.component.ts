import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticateService } from './services/authenticate.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticateService,
    private toastCtrl : ToastController

  ) {
    this.initializeApp();
  }
  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        //this.navCtrl.navigateBack('');

      })
      .catch(error => {
        console.log(error);
      })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  // openFirst() {
  //   this.menu.enable(true, 'first');
  //   this.menu.open('first');
  // }

  // openEnd() {
  //   this.menu.open('end');
  // }

  // openCustom() {
  //   this.menu.enable(true, 'custom');
  //   this.menu.open('custom');
  // }

   async presentToast() {
    const toast =  (await this.toastCtrl.create({
      message: 'Zostałeś wylogowany.',
      position: 'bottom',
      cssClass: 'customToastClass',
      duration: 3000
    })).present();
  }
}
