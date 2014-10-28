define("src/clickago.ES6", 
  ["exports"],
  function(__exports__) {
    "use strict";
    /*jslint esnext:true */
    /**
         * Clickago constructor.
         *
         * @class Clickago
         */
    function Clickago() {
        var Action, _call;

        this.actions = [];

        this.rollbacks = [];

        this.canRedo = false;
        
        this.canUndo = false;
        
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
        this.register = function (actionOptions, rollbackOptions) {
            this.actions[this.actions.length] = new Action({
                rollback: rollbackOptions,
                action: actionOptions
            });

            // Clear `rollbacks` array every time new action is registered.
            this.rollbacks.length = 0;

            this.canRedo = false;

            this.canUndo = !this.disabled;
        };

        /**
         * This function gets the latest registered actions and calls it.
         *
         * @method undo
         * @memberOf Clickago
         * @returns {*}
         */
        this.undo = function () {
            var action;

            if (this.disabled || !this.canUndo) {
                return;
            }

            action = this.actions[this.actions.length - 1];

            this.rollbacks[this.rollbacks.length] = action;

            this.canRedo = true;

            this.actions.length--;

            this.canUndo = !!this.actions.length;

            return _call(action.rollback);
        };

        /**
         * This function gets the latest registered rollback and calls it.
         *
         * @method redo
         * @memberOf Clickago
         * @returns {*}
         */
        this.redo = function () {
            var action;

            if (this.disabled || !this.canRedo) {
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
         * Disables Clickago undo/redo methods.
         *
         * @method disable
         * @memberOf Clickago
         */
        this.disable = function () {
            this.disabled = true;

            this.canUndo = false;

            this.canRedo = false;
        };

        /**
         * Enables Clickago undo/redo methods.
         *
         * @method enable
         * @memberOf Clickago
         */
        this.enable = function () {
            this.disabled = false;

            this.canUndo = !!this.actions.length;

            this.canRedo = !!this.rollbacks.length;
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

        /**
         * Simple method for calling actions and rollbacks.
         *
         * @method _call
         * @memberOf Clickago
         * @param actionOptions
         * @returns {*}
         * @private
         */
        _call = function (actionOptions) {
            return actionOptions.method.apply(actionOptions.thisArg, actionOptions.arguments);
        };

    }
    __exports__.Clickago = Clickago;
  });