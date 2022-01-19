/* eslint max-len: off, no-magic-numbers: off */

import assert from 'assert';
import {eachTestCases, useSettingsWith} from '../../util';

/**
 * wrapper
 *
 * @param {Array} args arguments
 * @param {Array} settings settings of defaults
 * @return {String}
 */
const wrapper = (args = [], settings = []) => `
${useSettingsWith(settings)}
@use "src/lib/mixin";

.selector {
  @include mixin.text-initialize(${args.filter((arg) => arg !== false).join(', ')});
}
`;

describe('@mixin text-initialize(...)', () => {

  it('should out properties with default value if corresponding variable in defaults is not number.', async () => {
    const cases = [
      {
        params: [
          [],
          ['$letter-spacing: ""']
        ],
        expected:
`.selector {
  letter-spacing: 0.04em;
  line-height: 1.5;
  text-align: left;
  text-decoration: none;
  text-indent: 0;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}`
      },
      {
        params: [
          [],
          ['$line-height: ""']
        ],
        expected:
`.selector {
  letter-spacing: 0.04em;
  line-height: 1.5;
  text-align: left;
  text-decoration: none;
  text-indent: 0;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}`
      }
    ];

    await eachTestCases(
      cases,
      wrapper,
      ({error, result, expected}, {resolve, reject}) => {
        if (error) {
          return reject(error);
        }

        const actual = result.css.toString().trim();

        assert(actual === expected);
        return resolve();
      },
      {outputStyle: 'expanded'}
    );
  });

  it('should out default properties if arguments not set.', async () => {
    const cases = [
      {
        params: [
          []
        ],
        expected:
`.selector {
  letter-spacing: 0.04em;
  line-height: 1.5;
  text-align: left;
  text-decoration: none;
  text-indent: 0;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}`
      }
    ];

    await eachTestCases(
      cases,
      wrapper,
      ({error, result, expected}, {resolve, reject}) => {
        if (error) {
          return reject(error);
        }

        const actual = result.css.toString().trim();

        assert(actual === expected);
        return resolve();
      },
      {outputStyle: 'expanded'}
    );
  });

  it('should out properties without white-space if arguments $white-space is valid string.', async () => {
    const cases = [
      {
        params: [
          ['$white-space: null']
        ],
        expected:
`.selector {
  letter-spacing: 0.04em;
  line-height: 1.5;
  text-align: left;
  text-decoration: none;
  text-indent: 0;
  word-break: break-all;
  word-wrap: break-word;
}`
      }
    ];

    await eachTestCases(
      cases,
      wrapper,
      ({error, result, expected}, {resolve, reject}) => {
        if (error) {
          return reject(error);
        }

        const actual = result.css.toString().trim();

        assert(actual === expected);
        return resolve();
      },
      {outputStyle: 'expanded'}
    );
  });

  it('should out properties without word-break if arguments $word-break is valid string.', async () => {
    const cases = [
      {
        params: [
          ['$word-break: null']
        ],
        expected:
`.selector {
  letter-spacing: 0.04em;
  line-height: 1.5;
  text-align: left;
  text-decoration: none;
  text-indent: 0;
  white-space: normal;
  word-wrap: break-word;
}`
      }
    ];

    await eachTestCases(
      cases,
      wrapper,
      ({error, result, expected}, {resolve, reject}) => {
        if (error) {
          return reject(error);
        }

        const actual = result.css.toString().trim();

        assert(actual === expected);
        return resolve();
      },
      {outputStyle: 'expanded'}
    );
  });

  it('should out properties without word-wrap if arguments $word-wrap is valid string.', async () => {
    const cases = [
      {
        params: [
          ['$word-wrap: null']
        ],
        expected:
`.selector {
  letter-spacing: 0.04em;
  line-height: 1.5;
  text-align: left;
  text-decoration: none;
  text-indent: 0;
  white-space: normal;
  word-break: break-all;
}`
      }
    ];

    await eachTestCases(
      cases,
      wrapper,
      ({error, result, expected}, {resolve, reject}) => {
        if (error) {
          return reject(error);
        }

        const actual = result.css.toString().trim();

        assert(actual === expected);
        return resolve();
      },
      {outputStyle: 'expanded'}
    );
  });

  it('should out properties with specified value if arguments is set.', async () => {
    const cases = [
      {
        params: [
          [
            '$letter-spacing: 0.1em',
            '$line-height: 15px',
            '$text-align: right',
            '$text-decoration: underline',
            '$text-indent: -100%',
            '$white-space: pre',
            '$word-break: normal',
            '$word-wrap: normal'
          ]
        ],
        expected:
`.selector {
  letter-spacing: 0.1em;
  line-height: 15px;
  text-align: right;
  text-decoration: underline;
  text-indent: -100%;
  white-space: pre;
  word-break: normal;
  word-wrap: normal;
}`
      }
    ];

    await eachTestCases(
      cases,
      wrapper,
      ({error, result, expected}, {resolve, reject}) => {
        if (error) {
          return reject(error);
        }

        const actual = result.css.toString().trim();

        assert(actual === expected);
        return resolve();
      },
      {outputStyle: 'expanded'}
    );
  });

});
