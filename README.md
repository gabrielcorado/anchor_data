# Anchor Data
Use anchor as query string.

# Table of contents
* [How it works](#how-it-works)
* [API](#api)
  * [insert](#insert)
  * [remove](#remove)
  * [get](#get)
* [Events](#events)
  * [List](#list)
  * [Usage](#usage)

# How it works
The lib use `document.location.hash` to store information like query string. If you have a compound data the lib store it with a `valueDelimiter` which by default is `=` then we would have `key=value`. You can also store simple data in this case the lib use only the `key`. Is possible to store more than one data, that will be separated by `delimiter` which by default is `&`.

# API

## insert
To insert you can pass 3 arguments are:
* **String** `key`
* **String** `value`
* **Object** `options` - that will accept only flag **override** wich is marked the lib override current value.

```javascript
// Simple
AnchorData.insert('flag'); // Inserts #flag

// Compound
AnchorData.insert('compound', 'value'); // Insert #compound=value

// Without override
AnchorData.insert('compound', 'new_value'); // Will not change #compound=value

// With override
AnchorData.insert('compound', 'new_value', {override: true}); // Will change #compound=new_value
```

## remove
Remove a data.

```javascript
AnchorData.remove('flag'); // Removes #flag

AnchorData.remove('compound'); // Removes #compound=new_value
```

## get
Get data value

```javascript
// Simple
AnchorData.get('flag'); // Returns true

// Compound
AnchorData.get('compound'); // Returns 'new_value'

// Not set
AnchorData.get('notset'); // Returns false
```

# Events
The lib emits some events to improve usage.

## List
* `dataUpdated`
* `dataInserted`
* `dataRemoved`

## Usage
```javascript
window.addEventListener('dataUpdated', function(e) {
  ...
});
```
