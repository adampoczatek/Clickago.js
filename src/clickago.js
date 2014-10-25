(function () {
    "use strict";

    var Clickago, Action, _bind, _call;

    /**
     * Clickago constructor.
     *
     * @class Clickago
     */
    Clickago = function () {
        this.actions = [];

        this.rollbacks = [];

        this.canRedo = null;

        this.canUndo = null;
    };

    /**
     * @method register
     * @memberOf Clickago
     * @param {Object} actionOptions
     * @param {Function} actionOptions.method - Reference to the function that will be returned after registration.
     * @param {*=} actionOptions.thisArg - Value of `this` in the `method`.
     * @param {Array=} actionOptions.arguments - An array of arguments.
     * @param {Object} rollbackOptions
     * @param {Function} rollbackOptions.method - Reference to the function that will be registered as an undo.
     * @param {*=} rollbackOptions.thisArg - Value of `this` in the `method`.
     * @param {Array=} rollbackOptions.arguments - An array of arguments.
     * @returns {Function} - Returns function bound with `this` and `arguments`.
     */
    Clickago.prototype.register = function (actionOptions, rollbackOptions) {
        this.actions[this.actions.length] = new Action({
            rollback: rollbackOptions,
            action: actionOptions
        });

        // Clear `rollbacks` array every time new action is registered.
        this.rollbacks.length = 0;

        this.canRedo = false;

        this.canUndo = true;
    };

    /**
     * This function gets the latest registered actions and calls it.
     *
     * @method undo
     * @memberOf Clickago
     * @returns {*}
     */
    Clickago.prototype.undo = function () {
        var action;

        if (!this.canUndo) {
            return;
        }

        action = this.actions[this.actions.length - 1];

        this.rollbacks[this.rollbacks.length] = action;

        this.canRedo = true;

        this.actions.length--;

        this.canUndo = !!this.actions.length;

        return _call(action.rollback);
    };

    Clickago.prototype.redo = function () {
        var action;

        if (!this.canRedo) {
            return;
        }

        action = this.rollbacks[this.rollbacks.length - 1];

        this.actions[this.actions.length] = action;

        this.canUndo = true;

        this.rollbacks.length--;

        this.canRedo = !!this.rollbacks.length;

        return _call(action.action);
    };

    /**
     * Models
     *
     * @namespace Models
     * @memberOf Clickago
     */

    /**
     * Data model for actions.
     *
     * @class Action
     * @memberOf Clickago.Models
     */
    Action = function (options) {
        this.action = options.action;
        this.rollback = options.rollback;
    };

    _call = function (actionOptions) {
        return actionOptions.method.apply(actionOptions.thisArg, actionOptions.arguments);
    };

    window.Clickago = Clickago;
})();