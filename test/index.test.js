import assert from 'node:assert';
import path from 'node:path';
import * as sass from 'sass';

describe('@hidoo/styleunit', () => {
  const packages = [
    '@hidoo/styleunit',
    '@hidoo/styleunit/lib',
    '@hidoo/styleunit/function',
    '@hidoo/styleunit/mixin',
    '@hidoo/styleunit/plugin/foo',
    '@hidoo/styleunit/settings',
    '@hidoo/styleunit/unit',
    '@hidoo/styleunit/unit/buz',
    '@hidoo/styleunit/unit/buz/modifier',
    '@hidoo/styleunit/util',
    '@hidoo/styleunit/util/modifier'
  ];

  // eslint-disable-next-line mocha/no-setup-in-describe
  packages.forEach((pkg) => {
    describe(pkg, () => {
      it(`should be importable with pkg: URL as pkg:${pkg}`, () => {
        let error = null;

        try {
          sass.compileString(`@use "pkg:${pkg}";`, {
            importers: [
              new sass.NodePackageImporter(
                path.join(process.cwd(), 'test/fixture')
              )
            ]
          });
        } catch (err) {
          error = err;
        }
        assert(!(error instanceof Error));
      });
    });
  });
});
