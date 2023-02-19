import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs';

@Component({
  selector: 'dontdothis-message-dialog',
  templateUrl: './message-dialog.component.html',
})
export class MessageDialogComponent {
  data$ = this.http
    .get(`/api/message/${this.filename}`, { responseType: 'arraybuffer' })
    .pipe(map((result) => new TextDecoder().decode(result)));

  constructor(
    private http: HttpClient,
    readonly sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public filename: string
  ) {}
}
