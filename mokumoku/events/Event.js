var events;
(function (events) {
    var Event = (function () {
        function Event(type, value) {
            if (typeof type === "undefined") { type = null; }
            if (typeof value === "undefined") { value = null; }
            this.type = type;
            this.value = value;
        }
        Event.COMPLETE = "complete";
        return Event;
    })();
    events.Event = Event;    
})(events || (events = {}));
//@ sourceMappingURL=Event.js.map
