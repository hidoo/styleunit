import sass from 'node-sass';

/**
 * default options of eachCompile
 * @type {Object}
 */
const defaultOptions = {
  outputStyle: 'compact'
};

/* eslint-disable max-params */
/**
 * each compile by test cases
 * @param {Array<Object>} testCases test case
 * @param {Function} wrapper wrapper function of sass code
 * @param {Function} rendered callback function when call rendered
 * @param {Object} options option
 * @return {Promise}
 */
export default async function eachCompile(
  testCases = [],
  wrapper = () => {},
  rendered = () => {},
  options = {}
) {
  const opts = {...defaultOptions, ...options},
        {outputStyle} = opts;

  return await Promise.all(testCases.map((testCase) =>
    new Promise((resolve, reject) => {
      const {params, expected} = testCase;

      sass.render(
        {
          data: wrapper(...params),
          outputStyle
        },
        (error, result) => rendered({params, expected, error, result}, {resolve, reject})
      );
    })
  ));
}
/* eslint-enable max-params */
