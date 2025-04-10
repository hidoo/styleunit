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
  @include mixin.breakpoint-define(${args.filter((arg) => arg !== false).join(', ')}) {
    font-size: 16px;
  };
}
`;

describe('@mixin breakpoint-define($from, $until, $options)', () => {
  it('should throw error if settings.$breakpoints is not map.', async () => {
    const cases = [
      {
        params: [['$from: 300px', '$until: 1000px'], ['$breakpoints: ""']]
      }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      assert(error.message.match(/settings\.\$breakpoints must be map\./));
      return resolve();
    });
  });

  it('should throw error if argument "$from" is not valid.', async () => {
    const cases = [
      {
        params: [['$from: false', '$until: 1000px']]
      },
      {
        params: [['$from: #000', '$until: 1000px']]
      }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      assert(
        error.message.match(
          /Argument \$from must be one of type number, string or null\./
        )
      );
      return resolve();
    });
  });

  it('should throw error if argument "$from" is not registered in settings.$breakpoints.', async () => {
    const cases = [
      {
        params: [['$from: "UNREGISTERED-BREAKPOINT"', '$until: 1000px']]
      }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      assert(
        error.message.match(
          /Argument \$from is not registerd in settings\.\$breakpoints\./
        )
      );
      return resolve();
    });
  });

  it('should throw error if argument "$until" is not valid.', async () => {
    const cases = [
      {
        params: [['$from: 1000px', '$until: false']]
      },
      {
        params: [['$from: 1000px', '$until: #000']]
      }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      assert(
        error.message.match(
          /Argument \$until must be one of type number, string or null\./
        )
      );
      return resolve();
    });
  });

  it('should throw error if argument "$until" is not registered in settings.$breakpoints.', async () => {
    const cases = [
      {
        params: [['$from: 1000px', '$until: "UNREGISTERED-BREAKPOINT"']]
      }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      assert(
        error.message.match(
          /Argument \$until is not registerd in settings\.\$breakpoints\./
        )
      );
      return resolve();
    });
  });

  it('should throw error if unit of argument "$from" is not same to it of "$until".', async () => {
    const cases = [
      {
        params: [['$from: 0rem', '$until: 0px']]
      },
      {
        params: [['$from: 0em', '$until: 1000rem']]
      }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      assert(
        error.message.match(/Arguments \$from and \$until must be same unit\./)
      );
      return resolve();
    });
  });

  it('should throw error if argument "$from" is not smaller than argument "$until".', async () => {
    const cases = [
      {
        params: [['$from: 1000px', '$until: 0']]
      },
      {
        params: [['$from: 1000px', '$until: 1000px']]
      },
      {
        params: [['$from: desktop', '$until: mobile']]
      }
    ];

    await eachTestCases(cases, wrapper, ({ error }, { resolve }) => {
      assert(error instanceof Error);
      assert(
        error.message.match(/Argument \$from must be smaller than \$until\./)
      );
      return resolve();
    });
  });

  it('should out @media rule.', async () => {
    const cases = [
      // both specifed
      {
        params: [['$from: 0', '$until: 1000px']],
        expected:
          '@media only screen and (min-width: 0)and (max-width: 999px){.selector{font-size:16px}}'
      },
      {
        params: [['$from: 30rem', '$until: 90rem']],
        expected:
          '@media only screen and (min-width: 30rem)and (max-width: 89rem){.selector{font-size:16px}}'
      },
      {
        params: [['$from: "mobile"', '$until: "desktop"']],
        expected:
          '@media only screen and (min-width: 667px)and (max-width: 1023px){.selector{font-size:16px}}'
      },
      // $from is not specified or null
      {
        params: [['$until: 1000px']],
        expected:
          '@media only screen and (max-width: 999px){.selector{font-size:16px}}'
      },
      {
        params: [['$from: null', '$until: 1000px']],
        expected:
          '@media only screen and (max-width: 999px){.selector{font-size:16px}}'
      },
      {
        params: [['$from: null', '$until: desktop']],
        expected:
          '@media only screen and (max-width: 1023px){.selector{font-size:16px}}'
      },
      // $until is not specified or null
      {
        params: [['$from: 30rem']],
        expected:
          '@media only screen and (min-width: 30rem){.selector{font-size:16px}}'
      },
      {
        params: [['$from: 30rem', '$until: null']],
        expected:
          '@media only screen and (min-width: 30rem){.selector{font-size:16px}}'
      },
      {
        params: [['$from: mobile', '$until: null']],
        expected:
          '@media only screen and (min-width: 667px){.selector{font-size:16px}}'
      },
      // both not specified or null (warning)
      {
        params: [[]],
        expected: ''
      },
      {
        params: [['$from: null', '$until: null']],
        expected: ''
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
  }).timeout(3 * 1000);

  it('should out @media rule with specified "media" if argument "$options" has "media" key.', async () => {
    const cases = [
      // both specifed
      {
        params: [
          ['$from: 0', '$until: 1000px', '$options: ("media": "print")']
        ],
        expected:
          '@media only print and (min-width: 0)and (max-width: 999px){.selector{font-size:16px}}'
      },
      {
        params: [['$until: 1000px', '$options: ("media": "print")']],
        expected:
          '@media only print and (max-width: 999px){.selector{font-size:16px}}'
      },
      {
        params: [['$from: 30rem', '$options: ("media": "print")']],
        expected:
          '@media only print and (min-width: 30rem){.selector{font-size:16px}}'
      },
      // both not specified or null (warning)
      {
        params: [['$options: ("media": "print")']],
        expected: ''
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
