import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  Injector,
  Type,
  ViewRef,
  ɵNG_COMP_DEF,
  ɵRender3ComponentFactory,
} from '@angular/core';
import {
  createCustomElement,
  NgElementConfig,
  NgElementConstructor,
} from '@angular/elements';

class IvyComponentFactoryResolver extends ComponentFactoryResolver {
  resolveComponentFactory<T>(component: Type<T>): ComponentFactory<T> {
    return new ɵRender3ComponentFactory(component[ɵNG_COMP_DEF]);
  }
}

class NoopApplicationRef {
  attachView(_viewRef: ViewRef): void {}
}

export function createCustomIvyElement<P>(
  component: Type<any>,
  config?: NgElementConfig,
): NgElementConstructor<P> {
  if (!config) {
    config = { injector: Injector.NULL };
  }

  config.injector = Injector.create({
    name: 'IvyElmentInjector',
    parent: config.injector,
    providers: [
      {
        provide: ApplicationRef,
        useFactory: () => new NoopApplicationRef(),
      },
      {
        provide: ComponentFactoryResolver,
        useFactory: () => new IvyComponentFactoryResolver(),
      },
    ],
  });

  return createCustomElement(component, config)
}
