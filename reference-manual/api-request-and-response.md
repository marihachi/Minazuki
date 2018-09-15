# Description
Please use POST method in all endpoints.  
`for-admin` endpoints require Basic Authentication.  

# /license/create (for-admin)
## request params
```json
{ }
```
## response
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

# /license/list (for-admin)
## request params
```json
{ }
```
## response
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

# /license/enable (for-admin)
## request params
```json
{
	"key": "lug6zApuG3wN6ewdHhfefppZ"
}
```
## response
```json
{
	"success": true
}
```

# /license/disable (for-admin)
## request params
```json
{
	"key": "lug6zApuG3wN6ewdHhfefppZ"
}
```
## response
```json
{
	"success": true
}
```

# /license/delete (for-admin)
## request params
```json
{
	"key": "lug6zApuG3wN6ewdHhfefppZ"
}
```
## response
```json
{
	"success": true
}
```

# /license/activate
## request params
```json
{
	"key": "lug6zApuG3wN6ewdHhfefppZ",
	"associationText": "hoge"
}
```
## response
```json
{
	"success":true
}
```

# /license/deactivate
## request params
```json
{
	"key": "lug6zApuG3wN6ewdHhfefppZ"
}
```
## response
```json
{
	"success": true
}
```

# /license/check
## request params
```json
{
	"key": "5JhoL6J5TbyjkV00ZBUrpzgF",
	"associationText": "hoge"
}
```
## response
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
