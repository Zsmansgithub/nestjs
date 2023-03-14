import axios from 'axios';
interface TypedPropertyDescriptor<T> {
  enumerable?: boolean;
  configurable?: boolean;
  writable?: boolean;
  value?: T;
  get?: () => T;
  set?: (value: T) => void;
}
const Get = (url: string) => {
  return <T>(
    target: object,
    key: string,
    descriptor: TypedPropertyDescriptor<T>
  ) => {
    const fn: unknown = descriptor.value;
    axios.get(url).then(res => {
      (fn as Function)(res.data, {
        status: 200,
        success: true
      });
    });
  };
};
const Post = (name: string, age: number) => {
  return <T>(
    target: object,
    key: string,
    descriptor: TypedPropertyDescriptor<T>
  ) => {
    const fn: unknown = descriptor.value;
    (fn as Function)(
      { name, age },
      {
        status: 200,
        success: true
      }
    );
  };
};

class controller {
  constructor() {}
  @Get('https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10')
  getList(res: object, status: object) {
    console.log(res);
    console.log(status);
  }
  @Post('小三', 32)
  create(res: object, status: object) {
    console.log(res)
    console.log(status)
  }
}
