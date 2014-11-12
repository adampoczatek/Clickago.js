# Clickago.js

Clickago.js is a lightweight JavaScript framework for undo and redo functionality. See [demo](http://adampoczatek.github.io/Clickago.js/).
 
## Dependencies.

There are no dependencies.

## Browser Support

Clickago.js works in the majority of browsers, including older versions of IE.

## Getting Started.

### 1. Include Clickago in Your Project.

There are couple of files in the `dist` folder:

  - `clickago.amd(.min).js` - AMD module.
  - `clickago.commonjs(.min).js` - CommonJS module.
  - `clickago(.min),js` - global variable (`window.Clickago`).

### 2. Initialise Clickago.
    
Example using global variable (`clickago.js`);

```javascript
var clickago = new Clickago();
```

### 3. Register Actions.

Ideally, you should wrap your functions and separate events (where you register your actions) from the functionality.


```javascript
var clickago = new Clickago(),
    users = {};

// Your function for adding users.
function addUserToCollection (userName, userEmail) {
    collection[userEmail] = {
        name: userName,
        email: userEmail
    };
    
    return collection;
}

// Your function for removing users.
function removeUserFromCollection (useEmail) {
    return delete collection[userEmail];
}

// Your wrapper function for adding users.
function addUser (userName, userEmail) {
    clickago.register({
        method: addUserToCollection,
        arguments: [userName, userEmail]
    }, {
        method: removeUserFromCollection,
        arguments: [userEmail]
    });
    
    addUserToCollection(userName, userEmail);
}

// Your wrapper function for removing users.
function removeUser (userEmail) {
    var user;
    
    user = user[userEmail];
    
    clickago.register({
        method: removeUserFromCollection,
        arguments: [userEmail]
    }, {
        method: addUserToCollection,
        arguments: [user.name, user.email]
    });
}

// Register action and add user to the collection.
addUser("Mike", "mike@acme.com");

// Call undo which removes Mike from the collection.
clickago.undo();

// Mike is back in the collection.
click.redo();
```
    
```javascript
clickago.register({
    method: addUser,
    arguments: ["Mike", "mike@acme.com"]
})
```


## API

**.register(actionOptions, rollbackOptions)**

Use this method to register new actions and rollbacks.

Use `actionOptions` and `rollbackOptions` to register your current action and its rollback method. Both parameters are 
objects and accept the same options:

  * `method` - this is a function that will be called.
  * `thisArg` - (optional) value of `this` when `method` gets called.
  * `arguments` - (optional) an array of arguments to be passed with `method`.


Example:

    var clickago = new Clickago()
    
    clickago.register({
        method: addUser,
        thisArg: window,
        arguments: ["Mike", "mike@acme.com"]
    }, {
        method: removeUser,
        thisArg: window,
        arguments: ["mike@acme.com"]
    });

**.undo()**

Use `.undo()` to call the latest registered rollback.

Example

    var clickago = new Clickago()
        
    clickago.register({
        method: addUser,
        thisArg: window,
        arguments: ["Mike", "mike@acme.com"]
    }, {
        method: removeUser,
        thisArg: window,
        arguments: ["mike@acme.com"]
    });
    
    clickago.undo(); // Same as calling removeUser.apply(window, ["mike@acme.com"]); 
    

**.redo()**

Use redo to call the latest registered action (works only after calling the `.undo()`).

Example: 

    var clickago = new Clickago()
        
    clickago.register({
        method: addUser,
        thisArg: window,
        arguments: ["Mike", "mike@acme.com"]
    }, {
        method: removeUser,
        thisArg: window,
        arguments: ["mike@acme.com"]
    });
    
    clickago.undo(); // Same as calling removeUser.apply(window, ["mike@acme.com"]);
    
    clickago.redo(); // Same as calling addUser.apply(window, ["Mike", "mike@acme.com"]); 

**.disable()**

Sometimes you may want to prevent users from undoing/redoing their actions, in those cases you can use the `.disable()`
method.

Example:

    var clickago = new Clickago()
        
    clickago.register({
        method: addUser,
        thisArg: window,
        arguments: ["Mike", "mike@acme.com"]
    }, {
        method: removeUser,
        thisArg: window,
        arguments: ["mike@acme.com"]
    });
    
    clickago.disable();
    
    clickago.undo(); // Returns 'undefined' and no actions get called.

**.enable()**

Use this method to enable Clickago.

Example:

    var clickago = new Clickago()
        
    clickago.register({
        method: addUser,
        thisArg: window,
        arguments: ["Mike", "mike@acme.com"]
    }, {
        method: removeUser,
        thisArg: window,
        arguments: ["mike@acme.com"]
    });
    
    clickago.disable();
    
    clickago.undo(); // Returns 'undefined' and no actions get called.
    
    clickago.enable();
    
    clickago.undo(); // Same as calling removeUser.apply(window, ["mike@acme.com"]);

**.canUndo and .canRedo**

These two properties indicate whether `.undo()` and `.redo()` can be called.

--


## License

The MIT License (MIT)

Copyright (c) 2014 Adam Poczatek

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.