"use strict";
exports.__esModule = true;
var checkers_1 = require("./checkers");
var map = new Map();
map.set(new checkers_1.Point(1, 2), "Hlelow");
console.log(map.has(new checkers_1.Point(1, 2)));
