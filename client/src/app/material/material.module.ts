import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';


const MaterialComponents = [
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatDialogModule,
  MatInputModule,
  MatProgressBarModule,
  MatToolbarModule,
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule {}