describe("Clickago", function() {
    var Tracker;

    beforeEach(function () {
        Tracker = new Clickago();
    });

    it("should disable redo/undo", function () {
        var action1,
            action2,
            action3,
            rollback1,
            rollback2,
            rollback3;

        action1 = function (text) {
            return "action 1 " +  text;
        };

        action2 = function (text) {
            return "action 2 " +  text;
        };

        action3 = function (text) {
            return "action 3 " +  text;
        };

        rollback1 = function (text) {
            return "rollback 1 " + text;
        };

        rollback2 = function (text) {
            return "rollback 2 " + text;
        };

        rollback3 = function (text) {
            return "rollback 3 " + text;
        };

        Tracker.register({
            method: action1,
            arguments: ["called 1"]
        }, {
            method: rollback1,
            arguments: ["called 1"]
        });

        Tracker.register({
            method: action2,
            arguments: ["called 2"]
        }, {
            method: rollback2,
            arguments: ["called 2"]
        });

        Tracker.register({
            method: action3,
            arguments: ["called 3"]
        }, {
            method: rollback3,
            arguments: ["called 3"]
        });

        expect(Tracker.undo()).toBe("rollback 3 called 3");
        expect(Tracker.undo()).toBe("rollback 2 called 2");

        Tracker.disable();

        expect(Tracker.undo()).toBe(undefined);
        expect(Tracker.redo()).toBe(undefined);

        Tracker.enable();

        expect(Tracker.undo()).toBe("rollback 1 called 1");
        
    });
});