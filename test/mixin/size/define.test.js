/* eslint max-len: 0, no-magic-numbers: 0 */

import assert from 'assert';
import { eachTestCases, useSettingsWith } from '../../util/index.js';

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
  @include mixin.size-define(${args.filter((arg) => arg !== false).join(',')});
}
`;

describe('@mixin size-define($type, $values, $breakpoints)', () => {
  it('should throw error if argument "$type" is not valid.', async () => {
    const cases = [
      { params: [['$type: null']] },
      { params: [['$type: false']] },
      { params: [['$type: 14px']] },
      { params: [['$type: #000']] },
      { params: [['$type: "_width"']] },
      { params: [['$type: "_height"']] },
      { params: [['$type: "_z-index"']] }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      assert(error.message.match(/Argument \$type must be one of/));
      return resolve();
    });
  });

  it('should throw error if argument "$values" is not valid.', async () => {
    const cases = [
      { params: [['$values: null']] },
      { params: [['$values: false']] },
      { params: [['$values: 14px']] },
      { params: [['$values: #000']] }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      assert(error.message.match(/Argument \$values must be list/));
      return resolve();
    });
  });

  it('should throw error if argument "$values" includes negative numbers.', async () => {
    const cases = [{ params: [['$values: (-1px,)']] }];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      assert(
        error.message.match(/Argument \$values includes negative numbers\./)
      );
      return resolve();
    });
  });

  it('should out options each by size.', async () => {
    const cases = [
      {
        params: [['$type: "width"', '$values: (10rem,)']],
        expected: [
          '.selector-10{width:10rem !important}',
          '.selector-min-10{min-width:10rem !important}',
          '.selector-max-10{max-width:10rem !important}'
        ].join('')
      },
      {
        params: [['$type: "height"', '$values: (10px, 20px)']],
        expected: [
          '.selector-10{height:10px !important}',
          '.selector-min-10{min-height:10px !important}',
          '.selector-max-10{max-height:10px !important}',
          '.selector-20{height:20px !important}',
          '.selector-min-20{min-height:20px !important}',
          '.selector-max-20{max-height:20px !important}'
        ].join('')
      },
      {
        params: [['$type: "z-index"', '$values: (5, 10)']],
        expected: [
          '.selector-5{z-index:5 !important}',
          '.selector-10{z-index:10 !important}'
        ].join('')
      }
    ];

    await eachTestCases(
      cases,
      wrapper,
      ({ error, result, expected }, { resolve, reject }) => {
        if (error) {
          return reject(error);
        }

        const actual = result.css.toString().trim();

        assert(actual === expected);
        return resolve();
      }
    );
  });

  it('should out options each by size with breakpoints.', async () => {
    const cases = [
      {
        params: [
          [
            '$type: "width"',
            '$values: (10rem,)',
            '$breakpoints: ("if-mobile": ("until": "mobile"))'
          ]
        ],
        expected: [
          '.selector-10{width:10rem !important}',
          '@media only screen and (max-width: 666px){.selector-10-if-mobile{width:10rem !important}}',
          '.selector-min-10{min-width:10rem !important}',
          '@media only screen and (max-width: 666px){.selector-min-10-if-mobile{min-width:10rem !important}}',
          '.selector-max-10{max-width:10rem !important}',
          '@media only screen and (max-width: 666px){.selector-max-10-if-mobile{max-width:10rem !important}}'
        ].join('')
      },
      {
        params: [
          [
            '$type: "height"',
            '$values: (10px, 20px)',
            '$breakpoints: ("if-mobile": ("until": "mobile"))'
          ]
        ],
        expected: [
          '.selector-10{height:10px !important}',
          '@media only screen and (max-width: 666px){.selector-10-if-mobile{height:10px !important}}',
          '.selector-min-10{min-height:10px !important}',
          '@media only screen and (max-width: 666px){.selector-min-10-if-mobile{min-height:10px !important}}',
          '.selector-max-10{max-height:10px !important}',
          '@media only screen and (max-width: 666px){.selector-max-10-if-mobile{max-height:10px !important}}',
          '.selector-20{height:20px !important}',
          '@media only screen and (max-width: 666px){.selector-20-if-mobile{height:20px !important}}',
          '.selector-min-20{min-height:20px !important}',
          '@media only screen and (max-width: 666px){.selector-min-20-if-mobile{min-height:20px !important}}',
          '.selector-max-20{max-height:20px !important}',
          '@media only screen and (max-width: 666px){.selector-max-20-if-mobile{max-height:20px !important}}'
        ].join('')
      },
      {
        params: [
          [
            '$type: "z-index"',
            '$values: (5, 10)',
            '$breakpoints: ("if-mobile": ("until": "mobile"))'
          ]
        ],
        expected: [
          '.selector-5{z-index:5 !important}',
          '@media only screen and (max-width: 666px){.selector-5-if-mobile{z-index:5 !important}}',
          '.selector-10{z-index:10 !important}',
          '@media only screen and (max-width: 666px){.selector-10-if-mobile{z-index:10 !important}}'
        ].join('')
      }
    ];

    await eachTestCases(
      cases,
      wrapper,
      ({ error, result, expected }, { resolve, reject }) => {
        if (error) {
          return reject(error);
        }

        const actual = result.css.toString().trim();

        assert(actual === expected);
        return resolve();
      }
    );
  });
});
