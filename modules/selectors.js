/* eslint-disable consistent-return */

export const addNewForm = document.forms[0];

/**
 *
 * @param {String} target
 * @param {Boolean|undefined} all
 * @returns
 */
export const $select = (target, all) => {
  if (all === true) return document.querySelectorAll(target);

  return document.querySelector(target);
};

/**
 *
 * @param {String|HTMLElement} target
 * @param {String?} value
 * @param {Boolean?} strict
 * @returns
 */
export const $text = (target, value, strict) => {
  if (!strict) target = $select(target);

  if (value === null) return target.textContent;

  target.textContent = value;
};

/**
 *
 * @param {String|HTMLElement} target
 * @param {String?} value
 * @param {Boolean?} strict
 * @returns
 */
export const $html = (target, value, strict) => {
  if (!strict) target = $select(target);

  if (!value) return target.innerHTML;

  target.innerHTML = value;
};

/**
 *
 * @param {String} targetId
 * @returns
 */
export const $selectById = (targetId) => document.getElementById(targetId);
