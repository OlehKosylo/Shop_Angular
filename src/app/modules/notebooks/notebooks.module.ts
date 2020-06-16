import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotebooksRoutingModule } from './notebooks-routing.module';
import { NotebookComponent } from './components/notebook/notebook.component';
import { NotebookContainerComponent } from './components/notebook-container/notebook-container.component';
import { PreViewNotebookComponent } from './components/pre-view-notebook/pre-view-notebook.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [NotebookComponent, NotebookContainerComponent, PreViewNotebookComponent],
  imports: [
    CommonModule,
    NotebooksRoutingModule,
    ReactiveFormsModule
  ],
  exports: [],
})
export class NotebooksModule { }
