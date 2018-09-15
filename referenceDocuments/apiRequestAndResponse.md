# Description
Please use POST method in all endpoints.  
`for-admin` endpoints require Basic Authentication.  

# Index of API docs
### general
- [/license/activate](#license-activate)
- [/license/deactivate](#license-deactivate)
- [/license/check](#license-check)
### for-admin
- [/license/create](#license-create)
- [/license/list](#license-list)
- [/license/enable](#license-enable)
- [/license/disable](#license-disable)
- [/license/delete](#license-delete)

# general endpoints

<h2 id="license-activate">/license/activate</h2>

### request params
```json
{
	"key": "lug6zApuG3wN6ewdHhfefppZ",
	"associationText": "hoge"
}
```
### response
```json
{
	"success":true
}
```

<h2 id="license-deactivate">/license/deactivate</h2>

### request params
```json
{
	"key": "lug6zApuG3wN6ewdHhfefppZ"
}
```
### response
```json
{
	"success": true
}
```

<h2 id="license-check">/license/check</h2>

### request params
```json
{
	"key": "5JhoL6J5TbyjkV00ZBUrpzgF",
	"associationText": "hoge"
}
```
### response
### Successfully
```json
{
	"success": true
}
```
### If different associationText
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

### request params
```json
{ }
```
### response
```json
{
	"success": true,
	"content": {
		"license": {
			"key": "lug6zApuG3wN6ewdHhfefppZ",
			"enabled": true,
			"activated": false
		}
	}
}
```

<h2 id="license-list">/license/list (for-admin)</h2>

### request params
```json
{ }
```
### response
```json
{
	"success": true,
	"content": {
		"licenses": [
			{
				"key": "lug6zApuG3wN6ewdHhfefppZ",
				"enabled": true,
				"activated": false
			}
		]
	}
}
```

<h2 id="license-enable">/license/enable (for-admin)</h2>

### request params
```json
{
	"key": "lug6zApuG3wN6ewdHhfefppZ"
}
```
### response
```json
{
	"success": true
}
```

<h2 id="license-disable">/license/disable (for-admin)</h2>

### request params
```json
{
	"key": "lug6zApuG3wN6ewdHhfefppZ"
}
```
### response
```json
{
	"success": true
}
```

<h2 id="license-delete">/license/delete (for-admin)</h2>

### request params
```json
{
	"key": "lug6zApuG3wN6ewdHhfefppZ"
}
```
#### response
```json
{
	"success": true
}
```
