describe("Clickago", function() {
    var Tracker;

    beforeEach(function () {
        Tracker = new Clickago();
    });

    it("Should flag if it can undo or redo properly", function () {
        var action1,
            rollback1;
        
        action1 = function (text) {
            return "action 1 " +  text;
        };

        
        rollback1 = function (text) {
            return "rollback 1 " + text;
        };

        
        
        expect(Tracker.canUndo).toBe(false);
        expect(Tracker.canRedo).toBe(false);
        
        Tracker.register({
            method: action1,
            arguments: ["called 1"]
        }, {
            method: rollback1,
            arguments: ["called 1"]
        });
        
        expect(Tracker.canUndo).toBe(true);
        expect(Tracker.canRedo).toBe(false);
        
        Tracker.undo();
        
        expect(Tracker.canUndo).toBe(false);
        expect(Tracker.canRedo).toBe(true);
        
        Tracker.redo();
        
        expect(Tracker.canUndo).toBe(true);
        expect(Tracker.canRedo).toBe(false);
        
        
    });
});