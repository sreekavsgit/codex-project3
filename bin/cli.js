#!/usr/bin/env node
const { greet } = require("../src/greet");

const name = process.argv[2] || "World";

greet(name);
