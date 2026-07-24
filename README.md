# array-fns

[JSR](https://jsr.io/@mary/array-fns) | [source code](https://tangled.sh/did:plc:5rt635wo7r23gmtbqlll247h)

small array utilities

```ts
const numbers = mapDefined(range(1, 5), (x) => x % 2 === 0 ? x * 2 : undefined);
//    ^? [4, 8]
```
