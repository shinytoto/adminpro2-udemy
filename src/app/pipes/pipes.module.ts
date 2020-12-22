import { NgModule } from '@angular/core';

// Pipes
import { ImagenPipe } from '../pipes/imagen.pipe';

@NgModule({
  declarations: [ImagenPipe],
  exports: [ImagenPipe],
})
export class PipesModule {}
