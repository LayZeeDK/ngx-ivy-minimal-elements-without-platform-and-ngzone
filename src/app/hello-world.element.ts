import { NgElementConstructor } from '@angular/elements';

import { createCustomIvyElement } from './create-custom-ivy-element';
import { HelloWorldComponent } from './hello-world.component';

export const HelloWorldElement: NgElementConstructor<HelloWorldComponent> =
  createCustomIvyElement(HelloWorldComponent);
