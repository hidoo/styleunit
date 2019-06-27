import existOrEmptyString from './existOrEmptyString';

/**
 * default values of settings
 * @type {Object}
 */
const defaultValues = {
  breakpoints: '("desktop": 1024px, "mobile": 667px)',
  stateSelectorsFocus: '(".is-focus")',
  stateSelectorsSelected: '(".is-selected")',
  stateSelectorsDisabled: '(".is-disabled")',
  stateSelectorsCurrent: '(".is-current")',
  fontEnableOverride: 'true',
  fontFamily: 'sans-serif',
  fontFamilyMonospace: 'monospace',
  fontEnableFeatureSettings: 'true',
  fontEnableRelativeSize: 'true',
  fontBaseSize: '16px',
  fontSize: '14px',
  letterSpacing: '0.04em',
  lineHeight: '1.5'
};

/**
 * mapping key to sass variable
 * @type {Object}
 */
const mappingKeyToSassVariable = new Map(
  [
    ['breakpoints', '$unit-breakpoints'],
    ['stateSelectorsFocus', '$unit-state-selectors-focus'],
    ['stateSelectorsSelected', '$unit-state-selectors-selected'],
    ['stateSelectorsDisabled', '$unit-state-selectors-disabled'],
    ['stateSelectorsCurrent', '$unit-state-selectors-current'],
    ['fontEnableOverride', '$unit-font-enable-override'],
    ['fontFamily', '$unit-font-family'],
    ['fontFamilyMonospace', '$unit-font-family-monospace'],
    ['fontEnableFeatureSettings', '$unit-font-enable-feature-settings'],
    ['fontEnableRelativeSize', '$unit-font-enable-relative-size'],
    ['fontBaseSize', '$unit-font-base-size'],
    ['fontSize', '$unit-font-size'],
    ['letterSpacing', '$unit-letter-spacing'],
    ['lineHeight', '$unit-line-height']
  ]
);

/**
 * return global settings
 * @param {Object} options global settings
 *   @param {String} options.breakpoints value of $unit-breakpoints
 *   @param {String} options.stateSelectorsFocus value of $unit-state-selectors-focus
 *   @param {String} options.stateSelectorsSelected value of $unit-state-selectors-selected
 *   @param {String} options.stateSelectorsDisabled value of $unit-state-selectors-disabled
 *   @param {String} options.stateSelectorsCurrent value of $unit-state-selectors-current
 *   @param {String} options.fontEnableOverride value of $unit-font-enable-override
 *   @param {String} options.fontFamily value of $unit-font-family
 *   @param {String} options.fontFamilyMonospace value of $unit-font-family-monospace
 *   @param {String} options.fontEnableFeatureSettings value of $unit-font-enable-feature-settings
 *   @param {String} options.fontEnableRelativeSize value of $unit-font-enable-relative-size
 *   @param {String} options.fontBaseSize value of $unit-font-base-size
 *   @param {String} options.fontSize value of $unit-font-size
 *   @param {String} options.letterSpacing value of $unit-letter-spacing
 *   @param {String} options.lineHeight value of $unit-line-height
 * @return {String}
 */
export default function normalizeGlobalSettings(options = {}) {
  const values = Object.entries({...defaultValues, ...options})
    .map(([key, value]) => {
      if (mappingKeyToSassVariable.has(key)) {
        const varName = mappingKeyToSassVariable.get(key);

        if (existOrEmptyString(value)) {
          return `${varName}: ${value};`;
        }
        return false;
      }
      return false;
    });

  return values.filter((value) => Boolean(value)).join('\n');
}
