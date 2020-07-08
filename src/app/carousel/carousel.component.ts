import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
		trigger('fade', [
			state('void', style({ opacity: 0})),
			transition(':enter', [animate("1300ms ease-in")])
		])
	],
})
export class CarouselComponent implements OnInit {

  public currentImageUrlIndex:number = 0;

  public imgUrlArr= [
    "assets/images/banner/shopping.jpg",
    "assets/images/banner/laptop.jpg",
    "assets/images/banner/time.jpg",
    "assets/images/banner/phone.jpg"
  ]

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      if (this.currentImageUrlIndex == this.imgUrlArr.length - 1)
        this.currentImageUrlIndex = 0;
      else
        this.currentImageUrlIndex += 1;
    }, 4000);
  }

}
