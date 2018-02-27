'use strict';



var expect = chai.expect;

/* eslint max-statements: "off", brace-style: "off" */

describe('Arguments', function() {

  describe('When arguments is src and dest', function() {

    it('Should succeed when src and dst is normal', function(done) {
      var src = { a: 1, b: 2 };
      var dst = { a: 9, c: 3 };
      expect(copyProps(src, dst)).to.deep.equal({ a: 1, b: 2, c: 3 });
      done();
    });

    it('Should not change dst when src is not an plain object',
    function(done) {
      var dst = { a: 9, c: 3 };
      expect(copyProps(undefined, dst)).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps(null, dst)).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps(true, dst)).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps(false, dst)).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps(0, dst)).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps(123, dst)).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps('', dst)).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps('A', dst)).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps([], dst)).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps([1,2,3], dst)).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps(new Date(0), dst)).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps(function() {}, dst)).to.deep.equal({ a: 9, c: 3 });
      done();
    });

    it('Should return copy of src when dst is not a plain object',
    function(done) {
      var src = { a: 9, c: 3 };
      expect(copyProps(src, undefined)).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps(src, null)).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps(src, true)).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps(src, false)).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps(src, 0)).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps(src, 123)).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps(src, '')).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps(src, 'A')).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps(src, [])).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps(src, [1,2,3])).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps(src, new Date(0))).to.deep.equal({ a: 9, c: 3 });
      expect(copyProps(src, function() {})).to.deep.equal({ a: 9, c: 3 });
      done();
    });

  });

  describe('When arguments is src, dst, fromto/converter/reverse', function() {

    it('Should succeed when 3rd arg is a plain object', function(done) {
      var src = { a: 1, b: { c: 2 } };
      var dst = { A: 10, B: { D: 20 } };
      var fromto = { a: 'A', 'b.c': 'B.C' };
      var expected = { A: 1, B: { C: 2, D: 20 } };
      expect(copyProps(src, dst, fromto)).to.deep.equal(expected);
      done();
    });

    it('Should only pass fromto properties of which value is a string',
    function(done) {
      var src = { a: 1, b: 2 };
      var dst = { A: 10, true: 20 };
      var fromto = { a: 'A', b: true };
      var expected = { A: 1, true: 20 };
      expect(copyProps(src, dst, fromto)).to.deep.equal(expected);
      done();
    });

    it('Should succeed when 3rd arg is an array', function(done) {
      var src = { a: 1, b: { c: 2 } };
      var dst = { a: 10, b: { d: 20 } };
      var fromto = ['a', 'b.c'];
      var expected = { a: 1, b: { c: 2, d: 20 } };
      expect(copyProps(src, dst, fromto)).to.deep.equal(expected);
      done();
    });

    it('Should only pas frommto elements which is a string', function(done) {
      var src = { a: 1, 123: 99 };
      var dst = { a: 10, 123: 8 };
      var fromto = ['a', 123];
      var expected = { a: 1, 123: 8 };
      expect(copyProps(src, dst, fromto)).to.deep.equal(expected);
      done();
    });

    it('Should succeed when 3rd arg is a function', function(done) {
      var src = { a: 1, b: { c: 2 } };
      var dst = { a: 10, b: { d: 20 } };
      var converter = function(srcInfo) { return srcInfo.value * 2; };
      var expected = { a: 2, b: { c: 4, d: 20 } };
      expect(copyProps(src, dst, converter)).to.deep.equal(expected);
      done();
    });

    it('Should succeed when 3rd arg is a boolean', function(done) {
      var src = { a: 1, b: { c: 2 } };
      var dst = { a: 10, b: { d: 20 } };
      var expected = { a: 10, b: { c: 2, d: 20 } };
      expect(copyProps(src, dst, true)).to.deep.equal(expected);
      done();
    });

    it('Should ignore 3rd arg when it is other type', function(done) {
      var src = { a: 1, b: { c: 2 } };
      var dst = { a: 10, b: { d: 20 } };
      var expected = { a: 1, b: { c: 2, d: 20 } };
      expect(copyProps(src, dst, undefined)).to.deep.equal(expected);
      expect(copyProps(src, dst, null)).to.deep.equal(expected);
      expect(copyProps(src, dst, 0)).to.deep.equal(expected);
      expect(copyProps(src, dst, 123)).to.deep.equal(expected);
      expect(copyProps(src, dst, '')).to.deep.equal(expected);
      expect(copyProps(src, dst, 'ABC')).to.deep.equal(expected);
      expect(copyProps(src, dst, new Date(0))).to.deep.equal(expected);
      done();
    });

  });

  describe('When arguments is src, dst, fromto, converter/reverse',
  function() {

    it('Should succeed when 4th arg is a function', function(done) {
      var src = { a: 1, b: { c: 2 } };
      var dst = { A: 10, B: { D: 20 } };
      var fromto = { a: 'A', 'b.c': 'B.C' };
      var expected = { A: 2, B: { C: 4, D: 20 } };
      expect(copyProps(src, dst, fromto, function(srcInfo) {
        return srcInfo.value * 2;
      })).to.deep.equal(expected);
      done();
    });

    it('Should succeed when 4th arg is a boolean', function(done) {
      var src = { a: 1, b: { c: 2 } };
      var dst = { A: 10, B: { D: 20 } };
      var fromto = { a: 'A', 'b.c': 'B.C', 'b.d': 'B.D' };
      var expected = { a: 10, b: { c: 2, d: 20 } };
      expect(copyProps(src, dst, fromto, true)).to.deep.equal(expected);
      done();
    });

    it('Should ignore 4th arg when it is other type', function(done) {
      var src = { a: 1, b: { c: 2 } };
      var dst = { A: 10, B: { D: 20 } };
      var map = { a: 'A', 'b.c': 'B.C' };
      var expected = { A: 1, B: { C: 2, D: 20 } };
      expect(copyProps(src, dst, map, undefined)).to.deep.equal(expected);
      expect(copyProps(src, dst, map, null)).to.deep.equal(expected);
      expect(copyProps(src, dst, map, 0)).to.deep.equal(expected);
      expect(copyProps(src, dst, map, 123)).to.deep.equal(expected);
      expect(copyProps(src, dst, map, '')).to.deep.equal(expected);
      expect(copyProps(src, dst, map, 'ABC')).to.deep.equal(expected);
      expect(copyProps(src, dst, map, [1,2])).to.deep.equal(expected);
      expect(copyProps(src, dst, map, { a:1, b:2 })).to.deep.equal(expected);
      expect(copyProps(src, dst, map, new Date())).to.deep.equal(expected);
      done();
    });

  });

  describe('When arguments is src, dst, fromto, converter, reverse',
  function() {

    it('Should succeed when 5th arg is a boolean', function(done) {
      var src = { a: 1, b: { c: 2 } };
      var dst = { A: 10, B: { D: 20 } };
      var fromto = { a: 'A', 'b.c': 'B.C', 'b.d': 'B.D' };
      var converter = function(srcInfo) { return srcInfo.value * 2; };
      var expected = { a: 20, b: { c: 2, d: 40 } };
      expect(copyProps(src, dst, fromto, converter, true))
        .to.deep.equal(expected);
      done();
    });

    it('Should ignore 5th arg when it is other type', function(done) {
      var src = { a: 1, b: { c: 2 } };
      var dst = { A: 10, B: { D: 20 } };
      var fromto = { a: 'A', 'b.c': 'B.C', 'b.d': 'B.D' };
      var converter = function(srcInfo) { return srcInfo.value * 2; };
      var expected = { A: 2, B: { C: 4, D: 20 } };
      expect(copyProps(src, dst, fromto, converter, undefined))
        .to.deep.equal(expected);
      expect(copyProps(src, dst, fromto, converter, null))
        .to.deep.equal(expected);
      expect(copyProps(src, dst, fromto, converter, 0))
        .to.deep.equal(expected);
      expect(copyProps(src, dst, fromto, converter, 123))
        .to.deep.equal(expected);
      expect(copyProps(src, dst, fromto, converter, ''))
        .to.deep.equal(expected);
      expect(copyProps(src, dst, fromto, converter, 'ABC'))
        .to.deep.equal(expected);
      expect(copyProps(src, dst, fromto, converter, [1,2]))
        .to.deep.equal(expected);
      expect(copyProps(src, dst, fromto, converter, { a:1, b: 2 }))
        .to.deep.equal(expected);
      expect(copyProps(src, dst, fromto, converter, new Date()))
        .to.deep.equal(expected);
      expect(copyProps(src, dst, fromto, converter, function() {}))
        .to.deep.equal(expected);
      done();
    });

  });

});

