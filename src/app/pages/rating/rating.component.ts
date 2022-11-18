import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  pages: number = 1;
  currentPage: number = 1;
  perPage: number = 6;
  // 
  totalResult: number;
  // 
  response: any;
  constructor() { }

  ngOnInit(): void {
    this.response = [
      {
        nameOfAuther: "Ahmad Ali",
        rating: this.numberOfStars(3),
        review: "Good service",
        image: "../../../assets/images/default-img.gif",
        orderNumber: "5512"
      }
    ]
    this.totalResult = this.response.length;
  }

  numberOfStars(num): any[] {
    return Array(num);
  }

  deleteRating(id){

  }

  selectPage(e){

  }

}
