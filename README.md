# array-fns

small array utilities

```ts
const numbers = mapDefined(range(1, 5), (x) => x % 2 === 0 ? x * 2 : undefined);
//    ^? [4, 8]
```
