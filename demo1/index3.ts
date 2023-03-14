// const doc: ClassDecorator = (target: any) => {
//   console.log(target);
//   target.prototype.name = '无事'
// };

// @doc
// class D {
//   constructor() {}
// }

// const xiao:any = new D()
// console.log(xiao.name)

const doc: PropertyDecorator = (target: any, key: string | symbol) => {
  // console.log(target);
  // console.log(key);
};

const doc1: MethodDecorator = (
  target: object,
  key: string | symbol,
  descriptor: object
) => {
//   console.log(target);
//   console.log(key);
//   console.log(descriptor);
};

const doc2: ParameterDecorator = (
    target: object,
    key: string | symbol,
    parameterIndex: number
  ) => {
    console.log(target);
    console.log(key);
    console.log(parameterIndex);
  };

class E {
  @doc
  public name: string;
  constructor() {
    this.name = '呵呵';
  }
  @doc1
  getName(a:string,b:string,@doc2 name:string) {

  }
}

const xiao: any = new E();
