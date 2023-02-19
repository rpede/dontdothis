import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'dontdothis-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
})
export class MessageFormComponent implements OnInit, OnDestroy {
  from = '';
  content = '';
  editor?: Editor;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  onSubmit(): void {
    this.http
      .post<{ message: string }>('/api/message', {
        from: this.from,
        content: this.content,
      })
      .subscribe(({ message }) => this.snackBar.open(message, 'dismiss'));
  }
}
