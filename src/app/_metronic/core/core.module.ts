import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstLetterPipe } from './pipes/first-letter.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { TrimStrPipe } from './pipes/trim-str.pipe';
import { FormatDateWithTimePipe } from './pipes/format-date-with-time.pipe';

@NgModule({
  declarations: [FirstLetterPipe, SafePipe, FormatDatePipe, TrimStrPipe, FormatDateWithTimePipe],
  imports: [CommonModule],
  exports: [FirstLetterPipe, SafePipe, FormatDatePipe, TrimStrPipe, FormatDateWithTimePipe],
})
export class CoreModule { }
