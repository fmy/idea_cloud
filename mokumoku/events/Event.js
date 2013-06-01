var events;
(function (events) {
    var Event = (function () {
        function Event() { }
        Event.COMPLETE = "complete";
        return Event;
    })();
    events.Event = Event;    
})(events || (events = {}));
//@ sourceMappingURL=Event.js.map
