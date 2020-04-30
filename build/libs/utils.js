"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Removes spaces at the beginning of each line of text
 * @param text
 * @returns {*}
 */
const removeSpaces = exports.removeSpaces = text => {
  return text.replace(/^ +/gm, "");
};