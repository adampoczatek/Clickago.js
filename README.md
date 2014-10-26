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

Disables `.undo()` and `.redo()`

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