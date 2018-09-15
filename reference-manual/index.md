# Description
Please use POST method in all endpoints.  
Path of the for-admin endpoints is `/admin/*`.  

# Reference of api request and response
Please refer to [api-request-and-response](api-request-and-response.md)

# Database document schema of license
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
