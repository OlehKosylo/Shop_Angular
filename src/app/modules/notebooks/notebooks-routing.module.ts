import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotebookContainerComponent} from './components/notebook-container/notebook-container.component';
import {NotebooksResolverService} from './services/resolvers/notebooks.resolver.service';
import {NotebookResolverService} from './services/resolvers/notebook.resolver.service';
import {NotebookComponent} from './components/notebook/notebook.component';


const routes: Routes = [
  {path: '', resolve: {notebooksResolverService: NotebooksResolverService}, component: NotebookContainerComponent},
  {path: ':id', resolve: {notebookResolverService: NotebookResolverService}, component: NotebookComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotebooksRoutingModule {
}
