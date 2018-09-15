# license document
```js
{
  _id: ObjectId,
  key: string(length 24),
  enabled: boolean,
  activation?: {
    associationHash: string,
    salt: number
  }
}
```
