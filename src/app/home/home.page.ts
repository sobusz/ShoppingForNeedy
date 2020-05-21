// home.page.ts
import { Component, ViewChild, ElementRef } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import * as firebase from 'firebase';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;

  latitude: number;
  longitude: number;

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) {
  }


  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('dragend', () => {

        this.latitude = this.map.center.lat();
        this.longitude = this.map.center.lng();

        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });

      // -- get lacation from current user and create his marker --
      firebase.initializeApp({
      apiKey: "AIzaSyCK0303BhB_05pCa0RQg2Xt_ft-8XYBXrM",
      authDomain: "needy-93473.firebaseapp.com",
      databaseURL: "https://needy-93473.firebaseio.com/",
      projectId: "needy-93473",
      storageBucket: "needy-93473.appspot.com",
      messagingSenderId: "882615586096",});
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          var userId = firebase.auth().currentUser.uid;
          return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
            var lat = (snapshot.val() && snapshot.val().lat) || 'Anonymous';
            var lng = (snapshot.val() && snapshot.val().lng) || 'Anonymous';
            console.log("test",lat);
            console.log("test",lng);

            var map = new google.maps.Map(document.getElementById("map"), mapOptions);
            var myLatLng ={lat,lng};
            var marker = new google.maps.Marker({
              position: myLatLng,

              title: 'Hello World!'
            });
            marker.setMap(map);


            });
        } else {
          // No user is signed in.
        }

      });
      // -- get lacation from current user and create his marker --

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }



  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
      });

  }

}