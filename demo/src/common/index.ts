import { doc } from 'prettier';
import { of, Observable, interval, take, retry, fromEvent } from 'rxjs';
import { map, filter, findIndex, reduce } from 'rxjs/operators';

// const observer = new Observable((subscribe) => {
//   subscribe.next(1);
//   setTimeout(() => {
//     subscribe.next(2);
//   }, 3000);
//   Promise.resolve().then(() => {
//     subscribe.next(3);
//   });
//   subscribe.next(5);
// });

// observer.subscribe({
//   next: (num) => {
//     console.log(num);
//   },
// });

// interval(500)
//   .pipe(take(5))
//   .subscribe((e) => {
//     console.log(e);
//   });

// const subs = interval(500)
// const subs = of(1, 2, 3, 4, 'c')
//   .pipe(
//     retry(3), // 重试（出错？）
//     map((v) => ({ num: v })),
//     filter((v) => v.num === 'c'),
//   )
//   .subscribe((e) => {
//     console.log(e);
//     if (e.num === 10) {
//       subs.unsubscribe();
//     }
//   });

// const click$ = fromEvent(document, 'click').pipe((e) => e.target);
// click$.subscribe((e) => {
//   console.log(e);
// });
