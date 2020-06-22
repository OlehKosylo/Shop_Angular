import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotebooksRoutingModule } from './notebooks-routing.module';
import { NotebookComponent } from './components/notebook/notebook.component';
import { NotebookContainerComponent } from './components/notebook-container/notebook-container.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PreViewNotebookComponent} from './components/pre-view-notebook/pre-view-notebook.component';


@NgModule({
  declarations: [NotebookComponent, NotebookContainerComponent, PreViewNotebookComponent],
  imports: [
    CommonModule,
    FormsModule,
    NotebooksRoutingModule,
    ReactiveFormsModule
  ],
  exports: [],
})
export class NotebooksModule { }
