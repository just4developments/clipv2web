"use strict";
var core_1 = require('@angular/core');
var EventService = (function () {
    function EventService() {
        this.emitter = new core_1.EventEmitter(true);
    }
    EventService.prototype.emit = function (data) {
        this.emitter.emit(data);
    };
    return EventService;
}());
exports.EventService = EventService;
