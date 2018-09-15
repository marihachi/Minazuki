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

# Error messages

## invalid_param
Occurs when an invalid parameter is specified.  
The format is incorrect or the value is incorrect.

## disabled_license
Occurs when the license is disabled by admin.

## already_activated
Occurs when try activate a license that has already been activated.

## not_activated
Occurs when try deactivate a license that has not been activated.

## different_association_text
occurs when value different from the registered associationText is specified.
