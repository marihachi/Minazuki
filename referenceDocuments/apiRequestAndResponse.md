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

----
## for-apps endpoints
----

<h1 id="license-activate">Activate license</h1>

## Description
Activate by associating the association-text with the license-key.

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
```json
{
	"success":true
}
```

<h1 id="license-deactivate">Deactivate license</h1>

## Description
Deactivate the license by remove the associating-text.

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
```json
{
	"success": true
}
```

<h1 id="license-check">Check license</h1>

## Description
Check the activation status of license, and verify association-text.

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
```json
{
	"success": true
}
```
If different associationText
```json
{
	"success": false,
	"error": {
		"message": "different_association_text"
	}
}
```

----
## for-admin endpoints
----

<h1 id="license-create">Create license (for-admin)</h1>

## Description
Create a license and get the license key.

## Request example
```
POST /license/check
```
```json
{ }
```
## Response example
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

## Request example
```
POST /license/list
```
```json
{ }
```
## Response example
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
```json
{
	"success": true
}
```

<h1 id="license-disable">Disable license (for-admin)</h1>

## Description
Make the license not operable by the user. (Suspend license)

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
```json
{
	"success": true
}
```

<h1 id="license-delete">Delete license (for-admin)</h1>

## Description
Delete the license.

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
```json
{
	"success": true
}
```
