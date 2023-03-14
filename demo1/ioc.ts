class A {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
class B {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
class Container {
  model: object;
  constructor() {
    this.model = {};
  }
  provide(key: string, model: any) {
    this.model[key] = model;
  }
  get(key: string) {
    if (this.model[key]) {
      return this.model[key];
    }
  }
}
const models = new Container();
models.provide('a', new A('aa'));
models.provide('b', new A('bb'));

class C {
  a: any;
  b: any;
  constructor(model: Container) {
    this.a = models['a'];
    this.b = models['b'];
  }
}
