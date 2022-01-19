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
  @include mixin.font-apply-size(${args.filter((arg) => arg !== false).join(', ')});
}
`;

describe('@mixin font-apply-size(...)', () => {

  it('should throw error if argument "$value" is not valid.', async () => {
    const cases = [
      {params: [[]]},
      {params: [['$value: null']]},
      {params: [['$value: false']]},
      {params: [['$value: "normal"']]},
      {params: [['$value: #000']]}
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should throw error if settings.$font-size-presets is not map.', async () => {
    const cases = [
      {
        params: [
          ['$value: null'],
          ['$font-size-presets: ""']
        ]
      }
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should throw error if argument "$value" is keyword and settings.$font-size is not set.', async () => {
    const cases = [
      {
        params: [
          ['$value: "medium"'],
          ['$font-size: ""']
        ]
      }
    ];

    await eachTestCases(cases, wrapper, ({error}, {resolve}) => {
      assert(error instanceof Error);
      return resolve();
    });
  });

  it('should out font-size.', async () => {
    const cases = [
      {
        params: [
          ['$value: 0']
        ],
        expected: '.selector{font-size:0}'
      },
      {
        params: [
          ['$value: 14px']
        ],
        expected: '.selector{font-size:14px;font-size:.875rem}'
      },
      {
        params: [
          ['$value: "medium"']
        ],
        expected: '.selector{font-size:14px;font-size:.875rem}'
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    });
  });

  it('should out font-size without rem if defaults$font-enable-relative-size is not true.', async () => {
    const cases = [
      {
        params: [
          ['$value: 0'],
          ['$font-enable-relative-size: false']
        ],
        expected: '.selector{font-size:0}'
      },
      {
        params: [
          ['$value: 14px'],
          ['$font-enable-relative-size: false']
        ],
        expected: '.selector{font-size:14px}'
      },
      {
        params: [
          ['$value: "medium"'],
          ['$font-enable-relative-size: false']
        ],
        expected: '.selector{font-size:14px}'
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    });
  });

  it('should out font-size smaller than specfied size if argument $monospace is true.', async () => {
    const cases = [
      {
        params: [
          [
            '$value: 0',
            '$monospace: true'
          ]
        ],
        expected: '.selector{font-size:0}'
      },
      {
        params: [
          [
            '$value: 14px',
            '$monospace: true'
          ]
        ],
        expected: '.selector{font-size:12px;font-size:.75rem}'
      },
      {
        params: [
          [
            '$value: "medium"',
            '$monospace: true'
          ]
        ],
        expected: '.selector{font-size:12px;font-size:.75rem}'
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    });
  });

  it('should out font-size with !important if argument $important is true.', async () => {
    const cases = [
      {
        params: [
          [
            '$value: 0',
            '$important: true'
          ]
        ],
        expected: '.selector{font-size:0 !important}'
      },
      {
        params: [
          [
            '$value: 14px',
            '$important: true'
          ]
        ],
        expected: '.selector{font-size:14px !important;font-size:.875rem !important}'
      },
      {
        params: [
          [
            '$value: medium',
            '$important: true'
          ]
        ],
        expected: '.selector{font-size:14px !important;font-size:.875rem !important}'
      }
    ];

    await eachTestCases(cases, wrapper, ({error, result, expected}, {resolve, reject}) => {
      if (error) {
        return reject(error);
      }

      const actual = result.css.toString().trim();

      assert(actual === expected);
      return resolve();
    });
  });

});
