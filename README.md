# Clickago.js

*Clickago.js* is a lightweight framework for implementing *Undo*/*Redo* functionality on a web page.

[Basic Demo](http://adampoczatek.github.io/Clickago.js/)

## API

### .register(actionOptions, rollbackOptions)

Use this method to register events.

Example:

```javascript
var message, tracker;

tracker = new Clickago();

message = function (text) {
    alert(text);
};

tracker.register({
    method: message,
    thisArg: window,
    arguments: ["You're fired!"]
}, {
    method: message,
    thisArg: window,
    arguments: ["My bad. You can keep your job."]
});

message("You're fired!"); // Alerts "You're fired!"
```
___

### .undo()

This method will get the newest `rollbackOptions` and evaluate it.

Example:

```javascript
tracker.undo(); // Alerts "My bad. You can keep your job."
```

___

### .redo()

This method will get the newest `actionOptions` and evaluate it.

Example:

```javascript
tracker.redo(); // Alerts "You're fired!"
```
___

### .canUndo / .canRedo

Boolean values indicating whether you can use `.undo()` and/or `.redo()`.

___

### .disable()

Disables `.undo()` and `.redo()` methods (you can still register new actions).

Example:

```javascript
tracker.disable();

tracker.undo(); // returns undefined;

trakcer.canUndo; // false
tracker.canRedo; // false
```
___

### .enable()

Enables `.undo()` and `.redo()`.

Example:

```javascript
tracker.enable();

tracker.undo(); // Alerts "My bad. You can keep your job."
```
___

## Example

```javascript
(function () {
    "use strict";

    var tracker, comments;

    // Initialise Clickago class.
    tracker = new Clickago();

    comments = [];

    // Inserting comments to the collection.
    function insertComment (comment) {
        comments[comments.length] = comment;
    };

    // Removing comments from the collection.
    function removeComment (index) {
        comments.splice(index, 1);
    };

    // Wraper function around `insertComment` which registers the events.
    function addComment (comment) {
        tracker.register({
            method: insertComment,
            thisArg: null,
            arguments: [comment]
        }, {
            method: removeComment,
            thisArg: null,
            arguments: [comments.length]
        });

        insertComment(comment);
    }

    // Wraper function around `insertComment` which registers the events.
    function deleteComment (index) {
        tracker.register({
            method: removeComment,
            thisArg: null,
            arguments: [index]
        }, {
            method: insertComment,
            thisArg: null,
            arguments: [comments[index]]
        });

        removeComment(index);
    };

    addComment("Comment 1");
    console.log(comments); // Logs ["Comment 1"]

    addComment("Comment 2");
    console.log(comments); // Logs ["Comment 1", "Comment 2"]

    addComment("Comment 3");
    console.log(comments); // Logs ["Comment 1", "Comment 2", "Comment 3"]

    deleteComment(2);
    console.log(comments); // Logs ["Comment 1", "Comment 2"]

    tracker.undo();
    console.log(comments); // Logs ["Comment 1", "Comment 2", "Comment 3"]

    tracker.redo();
    console.log(comments); // Logs ["Comment 1", "Comment 2"]

    tracker.undo();
    console.log(comments); // Logs ["Comment 1", "Comment 2", "Comment 3"]

    tracker.undo();
    console.log(comments); // Logs ["Comment 1", "Comment 2"]

    tracker.undo();
    console.log(comments); // Logs ["Comment 1"]

    tracker.undo();
    console.log(comments); // Logs []
})();
```

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