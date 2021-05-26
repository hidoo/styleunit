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
  @include mixin.use-box-aspect-ratio(${args.filter((arg) => arg !== false).join(', ')});
}
`;

describe('@mixin use-box-aspect-ratio(...)', () => {

  it('should out default properties if arguments not set.', async () => {
    const cases = [
      {
        params: [],
        expected:
`.selector::before {
  content: "";
  display: block;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
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
            '$width: 4',
            '$height: 3'
          ]
        ],
        expected:
`.selector::before {
  content: "";
  display: block;
  width: 100%;
  height: 0;
  padding-top: 75%;
}`
      },
      {
        params: [
          [
            '$width: 1',
            '$height: 1'
          ]
        ],
        expected:
`.selector::before {
  content: "";
  display: block;
  width: 100%;
  height: 0;
  padding-top: 100%;
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
