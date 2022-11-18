import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
// import { NgxSpinnerService } from "ngx-spinner";
import { TranslationService } from '../../../modules/i18n/translation.service';

@Component({
  selector: "app-pagination-bar",
  templateUrl: "./pagination-bar.component.html",
  styleUrls: ["./pagination-bar.component.scss"],
})
export class PaginationBarComponent implements OnInit, OnChanges {
  @Input() pages: number = 1;
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 5;
  @Output() selectPage = new EventEmitter<number>();
  slicedPages = [];
  slicedPageIndex = 1;
  currentLang: string;

  pagesArray: number[];

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.preparePagesArray();
    this.currentLang = this.translationService.getSelectedLanguage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pages && changes.pages.currentValue) {
      this.pages = changes.pages.currentValue;
      this.preparePagesArray();
    }
    if (changes.currentPage && changes.currentPage.currentValue) {
      this.currentPage = changes.currentPage.currentValue;
    }
    if (changes.itemsPerPage && changes.itemsPerPage.currentValue) {
      this.itemsPerPage = changes.itemsPerPage.currentValue;
    }
  }

  preparePagesArray() {
    this.pagesArray = Array(this.pages)
      .fill(0)
      .map((x, i) => i + 1);

    this.getSlicedPages();
  }

  changePage(pageNumber, action = "") {
    if (this.currentPage == pageNumber) {
      return;
    }
    if (action === "prev" && pageNumber % this.itemsPerPage === 0) {
      this.slicedPageIndex =
        this.slicedPageIndex > 1 ? this.slicedPageIndex - 1 : 1;
      this.getSlicedPages();
    }
    if (action === "next" && (pageNumber - 1) % this.itemsPerPage === 0) {
      this.slicedPageIndex++;
      this.getSlicedPages();
    }
    // this.loader.show();

    this.selectPage.emit(+pageNumber);
  }
  isLastPage(pageNumber) {
    return this.pages == pageNumber;
  }
  isFirstPage(pageNumber) {
    return pageNumber == 1;
  }

  getTotalSlicedPages() {
    return Math.ceil(this.pagesArray.length / this.itemsPerPage);
  }

  getSlicedPages() {
    this.slicedPages = this.pagesArray.slice(
      (this.slicedPageIndex - 1) * this.itemsPerPage,
      this.itemsPerPage * this.slicedPageIndex
    );
  }
}
