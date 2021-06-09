import sass from 'sass';

/**
 * default options of eachCompile
 *
 * @type {Object}
 */
const defaultOptions = {
  outputStyle: 'compressed'
};

/* eslint-disable max-params */
/**
 * each compile by test cases
 *
 * @param {Array<Object>} testCases test case
 * @param {Function} wrapper wrapper function of sass code
 * @param {Function} rendered callback function when call rendered
 * @param {Object} options option
 * @return {Promise}
 */
export default async function eachTestCases(
  testCases = [],
  wrapper = () => {}, // eslint-disable-line no-empty-function
  rendered = () => {}, // eslint-disable-line no-empty-function
  options = {}
) {
  const opts = {...defaultOptions, ...options};

  await Promise.all(testCases.map(
    (testCase) => new Promise((resolve, reject) => {
      const {params, expected} = testCase;

      sass.render(
        {
          ...opts,
          data: wrapper(...params)
        },
        (error, result) => rendered(
          {params, expected, error, result},
          {resolve, reject}
        )
      );
    })
  ));
}
/* eslint-enable max-params */
