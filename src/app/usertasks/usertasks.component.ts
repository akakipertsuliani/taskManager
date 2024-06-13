import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-usertasks',
  standalone: true,
  imports: [
    HeaderComponent, 
    DragDropModule, 
    MatDialogModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './usertasks.component.html',
  styleUrl: './usertasks.component.scss'
})
export class UsertasksComponent {
  userEmail: any = localStorage.getItem("email");
  isUserHere!: boolean;
  taskName!: string;

  todoCategory = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
  ];

  selectedValue: string = this.todoCategory[0].value;

  todo: string[] = [];
  proggress: string[] = [];
  done: string[] = [];

  constructor(private auth: AuthService, public dialog: MatDialog) {
    this.auth.checkEmailForStay(this.userEmail).subscribe(data => {
      this.isUserHere = data;
    })
  }

  getCategoryValue(event: Event): void {
    const category = event.target as HTMLSelectElement;
    console.log(category.value);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      height: '250px',
      data: {taskName: this.taskName}
    })

    dialogRef.afterClosed().subscribe(result => {
      this.taskName = result.taskName;
      this.todo.push(result);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
