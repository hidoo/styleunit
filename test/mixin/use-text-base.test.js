/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import eachTestCases from '../fixture/eachTestCases';
import normalizeGlobalSettings from '../fixture/normalizeGlobalSettings';

describe('@mixin use-text-base(...)', () => {

  /**
   * wrapper
   * @param {Object} options options
   *   @param {String|Null} options.letterSpacing setting for letter-spacing
   *   @param {String|Null} options.lineHeight setting for line-height
   *   @param {String|Null} options.textAlign setting for text-align
   *   @param {String|Null} options.textDecoration setting for text-decoration
   *   @param {String|Null} options.textIndent setting for text-indent
   *   @param {String|Null} options.whiteSpace setting for white-space
   *   @param {String|Null} options.wordWrap setting for word-wrap
   * @param {Object} globalSettings global settings
   * @return {String}
   */
  function wrapper(options = {}, globalSettings = {}) {
    const args = [
      options.letterSpacing || options.letterSpacing === '' ? `$letter-spacing: ${options.letterSpacing}` : false,
      options.lineHeight || options.lineHeight === '' ? `$line-height: ${options.lineHeight}` : false,
      options.textAlign || options.textAlign === '' ? `$text-align: ${options.textAlign}` : false,
      options.textDecoration || options.textDecoration === '' ? `$text-decoration: ${options.textDecoration}` : false,
      options.textIndent || options.textIndent === '' ? `$text-indent: ${options.textIndent}` : false,
      options.whiteSpace || options.whiteSpace === '' ? `$white-space: ${options.whiteSpace}` : false,
      options.wordWrap || options.wordWrap === '' ? `$word-wrap: ${options.wordWrap}` : false
    ];

    return `
${normalizeGlobalSettings(globalSettings)}
@import "src/lib/mixin/use-text-base";

.selector {
  @include use-text-base(${args.filter((arg) => arg !== false).join(', ')});
}
    `;
  }

  it('should out properties with default value if corresponding global variable is not defined.', async () => {
    const cases = [
      {
        params: [{}, {letterSpacing: null}],
        expected:
/* eslint-disable indent */
`.selector {
  letter-spacing: 0.04em;
  line-height: 1.5;
  text-align: left;
  text-decoration: none;
  text-indent: 0;
  white-space: normal;
  word-wrap: break-word;
}`
/* eslint-disable indent */
      },
      {
        params: [{}, {lineHeight: null}],
        expected:
/* eslint-disable indent */
`.selector {
  letter-spacing: 0.04em;
  line-height: 1.5;
  text-align: left;
  text-decoration: none;
  text-indent: 0;
  white-space: normal;
  word-wrap: break-word;
}`
/* eslint-disable indent */
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });

  it('should out default properties if arguments not set.', async () => {
    const cases = [
      {
        params: [{}],
        expected:
/* eslint-disable indent */
`.selector {
  letter-spacing: 0.04em;
  line-height: 1.5;
  text-align: left;
  text-decoration: none;
  text-indent: 0;
  white-space: normal;
  word-wrap: break-word;
}`
/* eslint-disable indent */
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });

  it('should out properties without white-space if arguments $white-space is valid string.', async () => {
    const cases = [
      {
        params: [{whiteSpace: 'null'}],
        expected:
/* eslint-disable indent */
`.selector {
  letter-spacing: 0.04em;
  line-height: 1.5;
  text-align: left;
  text-decoration: none;
  text-indent: 0;
  word-wrap: break-word;
}`
/* eslint-disable indent */
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });

  it('should out properties without word-wrap if arguments $word-wrap is valid string.', async () => {
    const cases = [
      {
        params: [{wordWrap: 'null'}],
        expected:
/* eslint-disable indent */
`.selector {
  letter-spacing: 0.04em;
  line-height: 1.5;
  text-align: left;
  text-decoration: none;
  text-indent: 0;
  white-space: normal;
}`
/* eslint-disable indent */
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });

  it('should out properties with specified value if arguments is set.', async () => {
    const cases = [
      {
        params: [{
          letterSpacing: '0.1em',
          lineHeight: '15px',
          textAlign: 'right',
          textDecoration: 'underline',
          textIndent: '-100%',
          whiteSpace: 'pre',
          wordWrap: 'normal'
        }],
        expected:
/* eslint-disable indent */
`.selector {
  letter-spacing: 0.1em;
  line-height: 15px;
  text-align: right;
  text-decoration: underline;
  text-indent: -100%;
  white-space: pre;
  word-wrap: normal;
}`
/* eslint-disable indent */
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    }, {outputStyle: 'expanded'});
  });

});
