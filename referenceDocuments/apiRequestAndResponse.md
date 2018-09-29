# Description
Please use POST method in all endpoints.  
`for-admin` endpoints require Basic Authentication.  
Please give all parameters to request body in JSON format(`application/json` Content-Type).  

# Index of API docs
### for-apps
- [Activate license](#license-activate)
- [Deactivate license](#license-deactivate)
- [Check license](#license-check)
### for-admin
- [Create license](#license-create)
- [List licenses](#license-list)
- [Enable license](#license-enable)
- [Disable license](#license-disable)
- [Delete license](#license-delete)

<h1 id="license-activate">Activate license</h1>

## Description
Activate by associating the association-text with the license-key.

## Parameters
Name | Type | Required | DefaultValue
---- | ---- | ---- | ----
key | string | true | -
associationText | string | true | -

## Request example
```
POST /license/activate
```
```json
{
	"key": "lug6zApuG3wN6ewdHhfefppZ",
	"associationText": "hoge"
}
```
## Response example
```
200 OK
```
```json
{
	"success":true
}
```

<h1 id="license-deactivate">Deactivate license</h1>

## Description
Deactivate the license by remove the associating-text.

## Parameters
Name | Type | Required | DefaultValue
---- | ---- | ---- | ----
key | string | true | -

## Request example
```
POST /license/deactivate
```
```json
{
	"key": "lug6zApuG3wN6ewdHhfefppZ"
}
```
## Response example
```
200 OK
```
```json
{
	"success": true
}
```

<h1 id="license-check">Check license</h1>

## Description
Check the activation status of license, and verify association-text.

## Parameters
Name | Type | Required | DefaultValue
---- | ---- | ---- | ----
key | string | true | -
associationText | string | true | -

## Request example
```
POST /license/check
```
```json
{
	"key": "5JhoL6J5TbyjkV00ZBUrpzgF",
	"associationText": "hoge"
}
```
## Response example
Successfully
```
200 OK
```
```json
{
	"success": true
}
```
If different associationText
```
400 Bad Request
```
```json
{
	"success": false,
	"error": {
		"message": "different_association_text"
	}
}
```

<h1 id="license-create">Create license (for-admin)</h1>

## Description
Create a license and get the license key.

## Parameters
There are no parameters.

## Request example
```
POST /license/create
```
```json
{
}
```
## Response example
```
200 OK
```
```json
{
	"success": true,
	"license": {
		"key": "lug6zApuG3wN6ewdHhfefppZ",
		"enabled": true,
		"activated": false
	}
}
```

<h1 id="license-list">List licenses (for-admin)</h1>

## Description
Get a list of licenses.

## Parameters
Name | Type | Required | DefaultValue
---- | ---- | ---- | ----
page | number | false | 1
limit | number | false | 30

## Request example
```
POST /license/list
```
```json
{
}
```
## Response example
```
200 OK
```
```json
{
	"success": true,
	"licenses": [
		{
			"key": "lug6zApuG3wN6ewdHhfefppZ",
			"enabled": true,
			"activated": false
		}
	]
}
```

<h1 id="license-enable">Enable license (for-admin)</h1>

## Description
Make the license operable by the user. (Unsuspend license)

## Parameters
Name | Type | Required | DefaultValue
---- | ---- | ---- | ----
key | string | true | -

## Request example
```
POST /license/enable
```
```json
{
	"key": "lug6zApuG3wN6ewdHhfefppZ"
}
```
## Response example
```
200 OK
```
```json
{
	"success": true
}
```

<h1 id="license-disable">Disable license (for-admin)</h1>

## Description
Make the license not operable by the user. (Suspend license)

## Parameters
Name | Type | Required | DefaultValue
---- | ---- | ---- | ----
key | string | true | -

## Request example
```
POST /license/disable
```
```json
{
	"key": "lug6zApuG3wN6ewdHhfefppZ"
}
```
## Response example
```
200 OK
```
```json
{
	"success": true
}
```

<h1 id="license-delete">Delete license (for-admin)</h1>

## Description
Delete the license.

## Parameters
Name | Type | Required | DefaultValue
---- | ---- | ---- | ----
key | string | true | -

## Request example
```
POST /license/delete
```
```json
{
	"key": "lug6zApuG3wN6ewdHhfefppZ"
}
```
## Response example
```
200 OK
```
```json
{
	"success": true
}
```
