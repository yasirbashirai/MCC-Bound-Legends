#!/usr/bin/env node
/**
 * The boat page is now built by the shared multi-page builder, so every WordPress page the client
 * gets (boat, How It Works, FAQ) goes through the same link map, form swap and tracking code.
 * Output still lands in this folder, so UPLOAD-GUIDE.md and the client's setup PDF stay correct.
 *
 *   node wordpress-boat-page/build.js http://localhost:3000   (whatever port `npm run dev` prints)
 *
 * To build all three at once: node wordpress-pages/build.js http://localhost:3000
 */
const { execFileSync } = require("child_process");
const path = require("path");
const origin = process.argv[2] || "http://localhost:3000";
execFileSync(process.execPath, [path.join(__dirname, "..", "wordpress-pages", "build.js"), origin, "boat-transport-florida"], { stdio: "inherit" });
