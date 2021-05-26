/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import {eachTestCases, useSettingsWith} from '../util';

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
  @include mixin.use-box-base(${args.filter((arg) => arg !== false).join(', ')});
}
`;

describe('@mixin use-box-base(...)', () => {

  it('should out default properties if arguments not set.', async () => {
    const cases = [
      {
        params: [[]],
        expected:
`.selector {
  display: block;
  box-sizing: content-box;
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  border: 0;
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

  it('should out properties without display if arguments $display is null.', async () => {
    const cases = [
      {
        params: [
          ['$display: null']
        ],
        expected:
`.selector {
  box-sizing: content-box;
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  border: 0;
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

  it('should out properties with overflow if arguments $overflow is valid string.', async () => {
    const cases = [
      {
        params: [
          ['$overflow: scroll']
        ],
        expected:
`.selector {
  display: block;
  overflow: scroll;
  box-sizing: content-box;
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  border: 0;
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

  it('should out properties without list-style if arguments $list-style is null.', async () => {
    const cases = [
      {
        params: [
          ['$list-style: null']
        ],
        expected:
`.selector {
  display: block;
  box-sizing: content-box;
  position: relative;
  margin: 0;
  padding: 0;
  border: 0;
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
            '$display: inline-block',
            '$box-sizing: border-box',
            '$position: "absolute"',
            '$list-style: "disc"',
            '$margin: 10px 0',
            '$padding: 15px',
            '$border: 1px solid #000'
          ]
        ],
        expected:
`.selector {
  display: inline-block;
  box-sizing: border-box;
  position: absolute;
  list-style: disc;
  margin: 10px 0;
  padding: 15px;
  border: 1px solid #000;
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
