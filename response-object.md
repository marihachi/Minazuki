# /admin/key/create
## request params
```json
{ }
```
## response
```json
{
	"success": true,
	"content": {
		"key": "lug6zApuG3wN6ewdHhfefppZ",
		"enabled": true,
		"activation": null
	}
}
```

# /admin/key/list
## request params
```json
{ }
```
## response
```json
{
	"success": true,
	"content": {
		"keys": [
			{
				"key": "lug6zApuG3wN6ewdHhfefppZ",
				"enabled": true,
				"activation": null
			}
		]
	}
}
```

# /admin/key/enable
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

# /admin/key/disable
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

# /admin/key/delete
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

# /key/activate
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

# /key/deactivate
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
