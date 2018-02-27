'use strict';



var expect = chai.expect;

/* eslint max-statements: "off", branch-style: "off" */

describe('Processing', function() {

  describe('When src and dst is single depth objects', function() {

    it('Should copy properties of src to dst', function(done) {
      var fn = function() {};
      var src = { a: null, b: true, c: 123, d: 'ABC', e: [1,2,3],
        f: { g: 1, h: 'H' }, i: new Date(0), j: fn };
      var dst = {};
      var result = copyProps(src, dst);
      expect(result).to.equal(dst);
      expect(dst).to.deep.equal(src);
      done();
    });

    it('Should overwrite dst properties by src properties', function(done) {
      var src = { a: 123, b: 'bbb', c: true };
      var dst = { a: 987, b: 'BBB', c: false };
      var result = copyProps(src, dst);
      expect(result).to.deep.equal(src);
      done();
    });

    it('Should ignore src properties of which value is undefined',
    function(done) {
      var src = { a: 0, b: '', c: null, d: undefined };
      var dst = {};
      var result = copyProps(src, dst);
      var expected = { a: 0, b: '', c: null };
      expect(result).to.deep.equal(expected);
      done();
    });

  });

  describe('When src and dst is multiple depth objects', function() {

    it('Should copy properties of src to dst', function(done) {
      var src = {
        a: 'A1',
        b: {
          c: 'C1',
          d: 'D1',
          e: {
            f: 'F1',
            g: 'G1',
          },
          h: 'H1',
        },
      };
      var dst = {};
      var result = copyProps(src, dst);
      expect(result).to.equal(dst);
      expect(result).to.deep.equal(src);
      done();
    });

    it('Should overwrite dst properties by src properties', function(done) {
      var src = {
        a: 'A1',
        b: {
          c: 'C1',
          d: 'D1',
          e: {
            f: 'F1',
            g: 'G1',
          },
          h: 'H1',
        },
      };
      var dst = {
        a: 'A2',
        b: {
          c: 'C2',
          d: 'D2',
          e: {
            f: 'F2',
            g: 'G2',
          },
          h: 'H2',
        },
      };
      var result = copyProps(src, dst);
      expect(result).to.deep.equal(src);
      done();
    });

    it('Should ignore src properties of which value is undefined',
    function(done) {
      var src = {
        a: '',
        b: {
          c: undefined,
          d: null,
          e: {
            f: 0,
            g: undefined,
          },
          h: [],
          i: {},
        },
      };
      var dst = {
        a: 'A2',
        b: {
          c: 'C2',
          d: 'D2',
          e: {
            f: 'F2',
            g: 'G2',
          },
          h: 'H2',
        },
      };
      var expected = {
        a: '',
        b: {
          c: 'C2',
          d: null,
          e: {
            f: 0,
            g: 'G2',
          },
          h: [],
          i: {},
        },
      };
      var result = copyProps(src, dst);
      expect(result).to.deep.equal(expected);
      done();
    });

    it('Should copy properties until parent object if value is undefined',
    function(done) {
      var src = {
        a: undefined,
        b: { c: undefined },
        e: { f: { g: undefined } },
        h: {},
        i: { j: {} },
      };
      var dst = {};
      var result = copyProps(src, dst);
      var expected = { b: {}, e: { f: {} }, h: {}, i: { j: {} } };
      expect(result).to.deep.equal(expected);
      expect(result.a).to.be.undefined;
      expect(result.b.c).to.be.undefined;
      expect(result.b.d).to.be.undefined;
      expect(result.e.f.g).to.be.undefined;
      expect(result.h.xxx).to.be.undefined;
      expect(result.i.j.yyy).to.be.undefined;
      done();
    });

  });

  describe('About fromto special cases', function() {

    it('When fromto has surplus properties to src', function(done) {
      var src = { a: 1, b: { c: 2 } };
      var dst = { A: 9, B: { C: 8 } };
      var fromto = { a: 'A', b: 'B', 'b.c': 'B.C', 'b.d': 'B.D', e: 'E' };
      var result = copyProps(src, dst, fromto);
      var expected = { A: 1, B: { C: 2 } };
      expect(result).to.deep.equal(expected);
      done();
    });

    it('When fromto has a part of properties of src', function(done) {
      var src = { a: 1, b: { c: 2, d: 3 }, e: 4 };
      var dst = { A: 9, B: { C: 8, d: 7 }, e: 6 };
      var fromto = { a: 'A', b: 'B', 'b.c': 'B.C' };
      var result = copyProps(src, dst, fromto);
      var expected = { A: 1, B: { C: 2, d: 7 }, e: 6 };
      expect(result).to.deep.equal(expected);
      done();
    });

    it('When fromto changes the structure against src', function(done) {
      var src = { a: 1, b: { c: 2, d: 3 }, e: 4 };
      var dst = { A: 9, B: { C: 8 },  d: 7, e: 6 };
      var fromto = { 'a': 'A.A', 'b.c': 'B', 'b.d': 'D.E.F' };
      var result = copyProps(src, dst, fromto);
      var expected = { A: { A: 1 }, B: 2, D: { E: { F: 3 }, }, d: 7, e: 6 };
      expect(result).to.deep.equal(expected);
      done();
    });

    it('When fromto is an empty object', function(done) {
      var src = { a: 1, b: { c: 2, d: 3 }, e: 4 };
      var dst = {};
      var fromto = {};
      var result = copyProps(src, dst, fromto);
      var expected = {};
      expect(result).to.deep.equal(expected);
      done();
    });

    it('When fromto is an empty array', function(done) {
      var src = { a: 1, b: { c: 2, d: 3 }, e: 4 };
      var dst = {};
      var fromto = [];
      var result = copyProps(src, dst, fromto);
      var expected = {};
      expect(result).to.deep.equal(expected);
      done();
    });

    it('When fromto object contains non-string value', function(done) {
      var src = { a: 1, b: { c: 2, d: 3 }, e: 4 };
      var dst = {};
      var fromto = { a: 'A', 'b.c': true, 'b.d': 123, 'b.e': ['B.E'] };
      var result = copyProps(src, dst, fromto);
      var expected = { A: 1 };
      expect(result).to.deep.equal(expected);
      done();
    });

    it('When fromto array contains non-string element', function(done) {
      var src = { a: 1, b: { c: 2, d: 3 }, e: 4 };
      var dst = {};
      var fromto = ['a', true, 123, ['B.E']];
      var result = copyProps(src, dst, fromto);
      var expected = { a: 1 };
      expect(result).to.deep.equal(expected);
      done();
    });

    it('Should copy properties until parent object if value is undefined',
    function(done) {
      var src = {};
      var dst = {};
      var fromto = ['a', 'b.c', 'b.d', 'e.f.g'];
      var result = copyProps(src, dst, fromto);
      var expected = { b: {}, e: { f: {} } };
      expect(result).to.deep.equal(expected);
      expect(result.a).to.be.undefined;
      expect(result.b.c).to.be.undefined;
      expect(result.b.d).to.be.undefined;
      expect(result.e.f.g).to.be.undefined;
      done();
    });

  });

  describe('About patterns of converter returns', function() {

    it('When converter returns undefined', function(done) {
      var src = { a: 1, b: { c: 2, d: 3, e: 4 } };
      var dst = { a: 'A', b: { e: 'E' } };
      function fn(srcInfo, dstInfo) {
        switch (srcInfo.keyChain) {
          case 'a': {
            expect(srcInfo.value).to.equal(1);
            expect(srcInfo.key).to.equal('a');
            expect(srcInfo.depth).to.equal(1);
            expect(srcInfo.parent).to.equal(src);
            expect(dstInfo.keyChain).to.equal(srcInfo.keyChain);
            expect(dstInfo.value).to.equal('A');
            expect(dstInfo.key).to.equal('a');
            expect(dstInfo.depth).to.equal(1);
            expect(dstInfo.parent).to.equal(dst);
            break;
          }
          case 'b.c': {
            expect(srcInfo.value).to.equal(2);
            expect(srcInfo.key).to.equal('c');
            expect(srcInfo.depth).to.equal(2);
            expect(srcInfo.parent).to.equal(src.b);
            expect(dstInfo.keyChain).to.equal(srcInfo.keyChain);
            expect(dstInfo.value).to.be.undefined;
            expect(dstInfo.key).to.equal('c');
            expect(dstInfo.depth).to.equal(2);
            expect(dstInfo.parent).to.equal(dst.b);
            break;
          }
          case 'b.d': {
            expect(srcInfo.value).to.equal(3);
            expect(srcInfo.key).to.equal('d');
            expect(srcInfo.depth).to.equal(2);
            expect(srcInfo.parent).to.equal(src.b);
            expect(dstInfo.keyChain).to.equal(srcInfo.keyChain);
            expect(dstInfo.value).to.be.undefined;
            expect(dstInfo.key).to.equal('d');
            expect(dstInfo.depth).to.equal(2);
            expect(dstInfo.parent).to.equal(dst.b);
            break;
          }
          case 'b.e': {
            expect(srcInfo.value).to.equal(4);
            expect(srcInfo.key).to.equal('e');
            expect(srcInfo.depth).to.equal(2);
            expect(srcInfo.parent).to.equal(src.b);
            expect(dstInfo.keyChain).to.equal(srcInfo.keyChain);
            expect(dstInfo.value).to.equal('E');
            expect(dstInfo.key).to.equal('e');
            expect(dstInfo.depth).to.equal(2);
            expect(dstInfo.parent).to.equal(dst.b);
            break;
          }
          default: {
            expect(true).to.not.be.true;
            break;
          }
        }
        return (srcInfo.keyChain === 'b.c') ? undefined : srcInfo.value;
      }
      var result = copyProps(src, dst, fn);
      var expected = { a: 1, b: { d: 3, e: 4 } };
      expect(result).to.deep.equal(expected);
      done();
    });

    it('When converter returns null', function(done) {
      var src = { a: 1, b: { c: 2, d: 3 } };
      var dst = {};
      function fn(srcInfo, dstInfo) {
        switch (srcInfo.keyChain) {
          case 'a': {
            expect(srcInfo.value).to.equal(1);
            expect(srcInfo.key).to.equal('a');
            expect(srcInfo.depth).to.equal(1);
            expect(srcInfo.parent).to.equal(src);
            expect(dstInfo.keyChain).to.equal(srcInfo.keyChain);
            expect(dstInfo.value).to.be.undefined;
            expect(dstInfo.key).to.equal('a');
            expect(dstInfo.depth).to.equal(1);
            expect(dstInfo.parent).to.equal(dst);
            break;
          }
          case 'b.c': {
            expect(srcInfo.value).to.equal(2);
            expect(srcInfo.key).to.equal('c');
            expect(srcInfo.depth).to.equal(2);
            expect(srcInfo.parent).to.equal(src.b);
            expect(dstInfo.keyChain).to.equal(srcInfo.keyChain);
            expect(dstInfo.value).to.be.undefined;
            expect(dstInfo.key).to.equal('c');
            expect(dstInfo.depth).to.equal(2);
            expect(dstInfo.parent).to.equal(dst.b);
            break;
          }
          case 'b.d': {
            expect(srcInfo.value).to.equal(3);
            expect(srcInfo.key).to.equal('d');
            expect(srcInfo.depth).to.equal(2);
            expect(srcInfo.parent).to.equal(src.b);
            expect(dstInfo.keyChain).to.equal(srcInfo.keyChain);
            expect(dstInfo.value).to.be.undefined;
            expect(dstInfo.key).to.equal('d');
            expect(dstInfo.depth).to.equal(2);
            expect(dstInfo.parent).to.equal(dst.b);
            break;
          }
          default: {
            expect(true).to.not.be.true;
            break;
          }
        }
        return (srcInfo.keyChain === 'b.c') ? null : srcInfo.value;
      }
      var result = copyProps(src, dst, fn);
      var expected = { a: 1, b: { c: null, d: 3 } };
      expect(result).to.deep.equal(expected);
      done();
    });

  });

  describe('About reverse', function() {

    it('When reverse is true', function(done) {
      var src = { a: 1, b: { d: 3 } };
      var dst = { a: 'A', b: { c: 'C', d: 'D' } };
      var result = copyProps(src, dst, true);
      var expected = { a: 'A', b: { c: 'C', d: 'D' } };
      expect(result).to.deep.equal(expected);

      src = { a: 1, b: { c: 2, d: 3 } };
      dst = { a: 'A', b: { c: 'C', d: 'D' } };
      var fromto = ['a', 'b.d'];
      result = copyProps(src, dst, fromto, true);
      expected = { a: 'A', b: { c: 2, d: 'D' } };
      expect(result).to.deep.equal(expected);

      src = { a: 1, b: { c: 2, d: 3 } };
      dst = { a: 'A', b: { c: 'C', d: 'D' } };
      var converter = function(srcInfo, dstInfo) {
        switch (srcInfo.keyChain) {
          case 'a': {
            expect(srcInfo.value).to.equal('A');
            expect(srcInfo.key).to.equal('a');
            expect(srcInfo.depth).to.equal(1);
            expect(srcInfo.parent).to.equal(dst);
            expect(dstInfo.keyChain).to.equal(srcInfo.keyChain);
            expect(dstInfo.value).to.equal(1);
            expect(dstInfo.key).to.equal('a');
            expect(dstInfo.depth).to.equal(1);
            expect(dstInfo.parent).to.equal(src);
            break;
          }
          case 'b.c': {
            expect(srcInfo.value).to.equal('C');
            expect(srcInfo.key).to.equal('c');
            expect(srcInfo.depth).to.equal(2);
            expect(srcInfo.parent).to.equal(dst.b);
            expect(dstInfo.keyChain).to.equal(srcInfo.keyChain);
            expect(dstInfo.value).to.equal(2);
            expect(dstInfo.key).to.equal('c');
            expect(dstInfo.depth).to.equal(2);
            expect(dstInfo.parent).to.equal(src.b);
            break;
          }
          case 'b.d': {
            expect(srcInfo.value).to.equal('D');
            expect(srcInfo.key).to.equal('d');
            expect(srcInfo.depth).to.equal(2);
            expect(srcInfo.parent).to.equal(dst.b);
            expect(dstInfo.keyChain).to.equal(srcInfo.keyChain);
            expect(dstInfo.value).to.equal(3);
            expect(dstInfo.key).to.equal('d');
            expect(dstInfo.depth).to.equal(2);
            expect(dstInfo.parent).to.equal(src.b);
            break;
          }
          default: {
            expect(true).to.not.be.true;
            break;
          }
        }
        if (srcInfo.keyChain === 'b.c') {
          return undefined;
        } else {
          return srcInfo.value.toLowerCase();
        }
      };
      result = copyProps(src, dst, converter, true);
      expected = { a: 'a', b: { c: 2, d: 'd' } };
      expect(result).to.deep.equal(expected);

      src = { a: 1, b: { c: 2, d: 3 } };
      dst = { a: 'A', b: { c: 'C', d: 'D', e: 'E', f: 'F' } };
      fromto = ['a', 'b.c', 'b.d', 'b.e'];
      converter = function(srcInfo, dstInfo) {
        switch (srcInfo.keyChain) {
          case 'a': {
            expect(srcInfo.value).to.equal('A');
            expect(srcInfo.key).to.equal('a');
            expect(srcInfo.depth).to.equal(1);
            expect(srcInfo.parent).to.equal(dst);
            expect(dstInfo.keyChain).to.equal(srcInfo.keyChain);
            expect(dstInfo.value).to.equal(1);
            expect(dstInfo.key).to.equal('a');
            expect(dstInfo.depth).to.equal(1);
            expect(dstInfo.parent).to.equal(src);
            break;
          }
          case 'b.c': {
            expect(srcInfo.value).to.equal('C');
            expect(srcInfo.key).to.equal('c');
            expect(srcInfo.depth).to.equal(2);
            expect(srcInfo.parent).to.equal(dst.b);
            expect(dstInfo.keyChain).to.equal(srcInfo.keyChain);
            expect(dstInfo.value).to.equal(2);
            expect(dstInfo.key).to.equal('c');
            expect(dstInfo.depth).to.equal(2);
            expect(dstInfo.parent).to.equal(src.b);
            break;
          }
          case 'b.d': {
            expect(srcInfo.value).to.equal('D');
            expect(srcInfo.key).to.equal('d');
            expect(srcInfo.depth).to.equal(2);
            expect(srcInfo.parent).to.equal(dst.b);
            expect(dstInfo.keyChain).to.equal(srcInfo.keyChain);
            expect(dstInfo.value).to.equal(3);
            expect(dstInfo.key).to.equal('d');
            expect(dstInfo.depth).to.equal(2);
            expect(dstInfo.parent).to.equal(src.b);
            break;
          }
          case 'b.e': {
            expect(srcInfo.value).to.equal('E');
            expect(srcInfo.key).to.equal('e');
            expect(srcInfo.depth).to.equal(2);
            expect(srcInfo.parent).to.equal(dst.b);
            expect(dstInfo.keyChain).to.equal(srcInfo.keyChain);
            expect(dstInfo.value).to.be.undefined;
            expect(dstInfo.key).to.equal('e');
            expect(dstInfo.depth).to.equal(2);
            expect(dstInfo.parent).to.equal(src.b);
            break;
          }
          default: {
            expect(true).to.not.be.true;
            break;
          }
        }
        if (srcInfo.keyChain === 'b.c') {
          return undefined;
        } else {
          return srcInfo.value.toLowerCase();
        }
      };
      result = copyProps(src, dst, fromto, converter, true);
      expected = { a: 'a', b: { c: 2, d: 'd', e: 'e' } };
      expect(result).to.deep.equal(expected);
      done();
    });

    it('When reverse is false', function(done) {
      var src = { a: 1, b: { d: 3 } };
      var dst = { a: 'A', b: { c: 'C', d: 'D' } };
      var result = copyProps(src, dst, false);
      var expected = { a: 1, b: { c: 'C', d: 3 } };
      expect(result).to.deep.equal(expected);

      src = { a: 1, b: { c: 2, d: 3 } };
      dst = { a: 'A', b: { c: 'C', d: 'D' } };
      var fromto = ['a', 'b.d'];
      result = copyProps(src, dst, fromto, false);
      expected = { a: 1, b: { c: 'C', d: 3 } };
      expect(result).to.deep.equal(expected);

      src = { a: 1, b: { c: 2, d: 3 } };
      dst = { a: 'A', b: { c: 'C', d: 'D' } };
      var converter = function(srcInfo, dstInfo) {
        switch (srcInfo.keyChain) {
          case 'a': {
            expect(srcInfo.value).to.equal(1);
            expect(srcInfo.key).to.equal('a');
            expect(srcInfo.depth).to.equal(1);
            expect(srcInfo.parent).to.equal(src);
            expect(dstInfo.keyChain).to.equal(srcInfo.keyChain);
            expect(dstInfo.value).to.equal('A');
            expect(dstInfo.key).to.equal('a');
            expect(dstInfo.depth).to.equal(1);
            expect(dstInfo.parent).to.equal(dst);
            break;
          }
          case 'b.c': {
            expect(srcInfo.value).to.equal(2);
            expect(srcInfo.key).to.equal('c');
            expect(srcInfo.depth).to.equal(2);
            expect(srcInfo.parent).to.equal(src.b);
            expect(dstInfo.keyChain).to.equal(srcInfo.keyChain);
            expect(dstInfo.value).to.equal('C');
            expect(dstInfo.key).to.equal('c');
            expect(dstInfo.depth).to.equal(2);
            expect(dstInfo.parent).to.equal(dst.b);
            break;
          }
          case 'b.d': {
            expect(srcInfo.value).to.equal(3);
            expect(srcInfo.key).to.equal('d');
            expect(srcInfo.depth).to.equal(2);
            expect(srcInfo.parent).to.equal(src.b);
            expect(dstInfo.keyChain).to.equal(srcInfo.keyChain);
            expect(dstInfo.value).to.equal('D');
            expect(dstInfo.key).to.equal('d');
            expect(dstInfo.depth).to.equal(2);
            expect(dstInfo.parent).to.equal(dst.b);
            break;
          }
          default: {
            expect(true).to.not.be.true;
            break;
          }
        }
        if (srcInfo.keyChain === 'b.c') {
          return undefined;
        } else {
          return srcInfo.value * 10;
        }
      };
      result = copyProps(src, dst, converter, false);
      expected = { a: 10, b: { c: 'C', d: 30 } };
      expect(result).to.deep.equal(expected);

      src = { a: 1, b: { c: 2, d: 3 } };
      dst = { a: 'A', b: { c: 'C', d: 'D', e: 'E', f: 'F' } };
      fromto = ['a', 'b.c', 'b.d', 'b.e'];
      converter = function(srcInfo, dstInfo) {
        switch (srcInfo.keyChain) {
          case 'a': {
            expect(srcInfo.value).to.equal(1);
            expect(srcInfo.key).to.equal('a');
            expect(srcInfo.depth).to.equal(1);
            expect(srcInfo.parent).to.equal(src);
            expect(dstInfo.keyChain).to.equal(srcInfo.keyChain);
            expect(dstInfo.value).to.equal('A');
            expect(dstInfo.key).to.equal('a');
            expect(dstInfo.depth).to.equal(1);
            expect(dstInfo.parent).to.equal(dst);
            break;
          }
          case 'b.c': {
            expect(srcInfo.value).to.equal(2);
            expect(srcInfo.key).to.equal('c');
            expect(srcInfo.depth).to.equal(2);
            expect(srcInfo.parent).to.equal(src.b);
            expect(dstInfo.keyChain).to.equal(srcInfo.keyChain);
            expect(dstInfo.value).to.equal('C');
            expect(dstInfo.key).to.equal('c');
            expect(dstInfo.depth).to.equal(2);
            expect(dstInfo.parent).to.equal(dst.b);
            break;
          }
          case 'b.d': {
            expect(srcInfo.value).to.equal(3);
            expect(srcInfo.key).to.equal('d');
            expect(srcInfo.depth).to.equal(2);
            expect(srcInfo.parent).to.equal(src.b);
            expect(dstInfo.keyChain).to.equal(srcInfo.keyChain);
            expect(dstInfo.value).to.equal('D');
            expect(dstInfo.key).to.equal('d');
            expect(dstInfo.depth).to.equal(2);
            expect(dstInfo.parent).to.equal(dst.b);
            break;
          }
          case 'b.e': {
            expect(srcInfo.value).to.be.undefined;
            expect(srcInfo.key).to.equal('e');
            expect(srcInfo.depth).to.equal(2);
            expect(srcInfo.parent).to.equal(src.b);
            expect(dstInfo.keyChain).to.equal(srcInfo.keyChain);
            expect(dstInfo.value).to.equal('E');
            expect(dstInfo.key).to.equal('e');
            expect(dstInfo.depth).to.equal(2);
            expect(dstInfo.parent).to.equal(dst.b);
            break;
          }
          default: {
            expect(true).to.not.be.true;
            break;
          }
        }
        if (srcInfo.keyChain === 'b.c') {
          return undefined;
        } else {
          return srcInfo.value * 10;
        }
      };
      result = copyProps(src, dst, fromto, converter, false);
      expected = { a: 10, b: { c: 'C', d: 30, e: 'E', f: 'F' } };
      expect(result).to.deep.equal(expected);
      done();
    });

    it('When reverse is true and fromto has a property of which value ' +
       'is same \n\twith other properties', function(done) {
      var src = { a: 1, b: { c: 2, d: 3 } };
      var dst = { A: 'AAA', B: 'BBB' };
      var fromto = { a: 'A', 'b.c': 'B', 'b.d': 'B' };
      var expected = { A: 1, B: 3 };
      var result = copyProps(src, dst, fromto);
      expect(result).to.deep.equal(expected);

      src = { a: 1, b: { c: 2, d: 3 } };
      dst = { A: 'AAA', B: 'BBB' };
      fromto = { a: 'A', 'b.c': 'B', 'b.d': 'B' };
      expected = { a: 'AAA', b: { c: 'BBB', d: 'BBB' } };
      result = copyProps(src, dst, fromto, true);
      expect(result).to.deep.equal(expected);
      done();
    });

  });

});
