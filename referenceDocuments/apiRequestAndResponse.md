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

# for-apps endpoints

<h2 id="license-activate">Activate license</h2>

### Request example
```
POST /license/activate
```
```json
{
	"key": "lug6zApuG3wN6ewdHhfefppZ",
	"associationText": "hoge"
}
```
### Response example
```json
{
	"success":true
}
```

<h2 id="license-deactivate">Deactivate license</h2>

### Request example
```
POST /license/deactivate
```
```json
{
	"key": "lug6zApuG3wN6ewdHhfefppZ"
}
```
### Response example
```json
{
	"success": true
}
```

<h2 id="license-check">Check license</h2>

### Request example
```
POST /license/check
```
```json
{
	"key": "5JhoL6J5TbyjkV00ZBUrpzgF",
	"associationText": "hoge"
}
```
### Response example
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

# for-admin endpoints

<h2 id="license-create">/license/create (for-admin)</h2>

### Request example
```
POST /license/check
```
```json
{ }
```
### Response example
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

<h2 id="license-list">List licenses (for-admin)</h2>

### Request example
```
POST /license/list
```
```json
{ }
```
### Response example
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

<h2 id="license-enable">Enable license (for-admin)</h2>

### Request example
```
POST /license/enable
```
```json
{
	"key": "lug6zApuG3wN6ewdHhfefppZ"
}
```
### Response example
```json
{
	"success": true
}
```

<h2 id="license-disable">Disable license (for-admin)</h2>

### Request example
```
POST /license/disable
```
```json
{
	"key": "lug6zApuG3wN6ewdHhfefppZ"
}
```
### Response example
```json
{
	"success": true
}
```

<h2 id="license-delete">Delete license (for-admin)</h2>

### Request example
```
POST /license/delete
```
```json
{
	"key": "lug6zApuG3wN6ewdHhfefppZ"
}
```
#### Response example
```json
{
	"success": true
}
```
