import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { MessageTableComponent } from './message-table/message-table.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MessageTableComponent,
      },
    ]),
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
  ],
  declarations: [MessageTableComponent, MessageDialogComponent],
})
export class MessageModule {}
