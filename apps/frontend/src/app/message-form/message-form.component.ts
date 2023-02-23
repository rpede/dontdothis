import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Editor } from 'ngx-editor';
import { firstValueFrom } from 'rxjs';
import { AuthService, User } from '../../auth.service';

@Component({
  selector: 'dontdothis-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
})
export class MessageFormComponent implements OnInit, OnDestroy {
  from = '';
  content = '';
  editor?: Editor;
  user: User | null = null;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {
  }

  async ngOnInit() {
    this.editor = new Editor();
    this.user = await firstValueFrom(this.auth.user);
    this.from = this.user?.email ?? '';
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
