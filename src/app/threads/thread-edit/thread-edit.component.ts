import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThreadService } from '../thread.service';

@Component({
  selector: 'app-thread-edit',
  templateUrl: './thread-edit.component.html',
  styleUrl: './thread-edit.component.css'
})
export class ThreadEditComponent implements OnInit{
  id: number;
  editMode = false;
  threadForm: FormGroup;

  constructor(private threadService: ThreadService) {
    
  }

  ngOnInit() {
    
  }

  ngSubmit() {

  }
  
  onCancel() {

  }
}
