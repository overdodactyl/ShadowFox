'use strict';

var eachProps = require('..');
var chai = require('chai');
var expect = chai.expect;

function logger(value, keyChain, nodeInfo) {
  this.push({
    value: value,
    keyChain: keyChain,
    nodeInfo: nodeInfo,
  });
}

var fnNoReturn = function() {};
var fnReturnNull = function() {
  return null;
};
var fnReturnBool = function() {
  return true;
};
var fnReturnNum = function() {
  return 123;
};
var fnReturnStr = function() {
  return 'abc';
};
var fnReturnFunc = function() {
  return fnNoReturn;
};
var fnReturnObj = function() {
  return {};
};
var fnSort = function(arr) {
  return arr.sort(sorter);
  function sorter(a, b) {
    return (b < a) ? -1 : 1;
  }
};

/* eslint max-statements: "off", brace-style: "off" */

describe('Argument test', function() {

  it('Should process normally when args are normal', function(done) {
    var logs = [];

    var obj =  { a: 1, b: { c: 2 } };
    var opts =  { xxx: true };
    eachProps(obj, logger.bind(logs), opts);

    expect(obj).to.deep.equal({ a: 1, b: { c: 2 } });
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, xxx: true, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, xxx: true, name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, xxx: true, name: 'c' },
      },
    ]);
    done();
  });

  it('Should process normally when args are normal (opts.sort is specified',
  function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = { sort: fnSort };
    eachProps(obj, logger.bind(logs), opts);

    expect(obj).to.deep.equal({ a: 1, b: { c: 2 } });
    expect(logs).to.deep.equal([
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 0, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, sort: fnSort, name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, sort: fnSort, name: 'c' },
      },
      { value: 1, keyChain: 'a', nodeInfo: { index: 1, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, sort: fnSort, name: 'a' },
      },
    ]);
    done();
  });

  it('Should process nothing when 1st arg is undefined', function(done) {
    var logs = [];

    var obj = undefined;
    var opts = {};
    eachProps(obj, logger.bind(logs), opts);

    expect(obj).to.equal(undefined);
    expect(logs).to.deep.equal([]);
    done();
  });

  it('Should process nothing when 1st arg is null', function(done) {
    var logs = [];

    var obj = null;
    var opts = {};
    eachProps(obj, logger.bind(logs), opts);

    expect(obj).to.equal(null);
    expect(logs).to.deep.equal([]);
    done();
  });

  it('Should process nothing when 1st arg is not a boolean', function(done) {
    var logs = [];

    var obj = true;
    var opts = {};
    eachProps(obj, logger.bind(logs), opts);

    expect(obj).to.equal(true);
    expect(logs).to.deep.equal([]);
    done();
  });

  it('Should process nothing when 1st arg is a number', function(done) {
    var logs = [];

    var obj = 9;
    var opts = {};
    eachProps(obj, logger.bind(logs), opts);

    expect(obj).to.equal(9);
    expect(logs).to.deep.equal([]);
    done();
  });

  it('Should process nothing when 1st arg is a string', function(done) {
    var logs = [];

    var obj = 'ABC';
    var opts = {};
    eachProps(obj, logger.bind(logs), opts);

    expect(obj).to.equal('ABC');
    expect(logs).to.deep.equal([]);
    done();
  });

  it('Should process nothing when 1st arg is an array', function(done) {
    var logs = [];

    var obj = [{ a: 1 }, { b: 2 }, { c: 3 }];
    var opts = {};
    eachProps(obj, logger.bind(logs), opts);

    expect(obj).to.deep.equal([{ a: 1 }, { b: 2 }, { c: 3 }]);
    expect(logs).to.deep.equal([]);
    done();
  });

  it('Should process nothing when 1st arg is a function', function(done) {
    var logs = [];

    var obj = fnNoReturn;
    var opts = {};
    eachProps(obj, logger.bind(logs), opts);

    expect(logs).to.deep.equal([]);
    done();
  });

  it('Should process nothing when 1st arg is a typed object',
  function(done) {
    var logs = [];

    var obj = new Date(0);
    var opts = {};
    eachProps(obj, logger.bind(logs), opts);

    expect(logs).to.deep.equal([]);
    done();
  });

  it('Should process nothing when 1st arg is an empty plain object',
  function(done) {
    var logs = [];

    var obj = {};
    var opts = {};
    eachProps(obj, logger.bind(logs), opts);

    expect(obj).to.deep.equal({});
    expect(logs).to.deep.equal([]);
    done();
  });

  it('Should process nothing when 2nd arg is undefined', function(done) {
    var obj = { a: 1 };
    var fn = undefined;
    eachProps(obj, fn);
    expect(obj).to.deep.equal({ a: 1 });
    done();
  });

  it('Should process nothing when 2nd arg is null', function(done) {
    var obj = { a: 1 };
    var fn = null;
    eachProps(obj, fn);
    expect(obj).to.deep.equal({ a: 1 });
    done();
  });

  it('Should process nothing when 2nd arg is a boolean', function(done) {
    var obj = { a: 1 };
    var fn = true;
    eachProps(obj, fn);
    expect(obj).to.deep.equal({ a: 1 });
    done();
  });

  it('Should process nothing when 2nd arg is a number', function(done) {
    var obj = { a: 1 };
    var fn = 123;
    eachProps(obj, fn);
    expect(obj).to.deep.equal({ a: 1 });
    done();
  });

  it('Should process nothing when 2nd arg is a string', function(done) {
    var obj = { a: 1 };
    var fn = 'ABC';
    eachProps(obj, fn);
    expect(obj).to.deep.equal({ a: 1 });
    done();
  });

  it('Should process nothing when 2nd arg is an array', function(done) {
    var obj = { a: 1 };
    var fn = ['A', 'B', 'C'];
    eachProps(obj, fn);
    expect(obj).to.deep.equal({ a: 1 });
    done();
  });

  it('Should process nothing when 2nd arg is an plain object',
  function(done) {
    var obj = { a: 1 };
    var fn = { a: 'A', b: 'B', c: 'C' };
    eachProps(obj, fn);
    expect(obj).to.deep.equal({ a: 1 });
    done();
  });

  it('Should process nothing when 2nd arg is an typed object',
  function(done) {
    var obj = { a: 1 };
    var fn = new Date(0);
    eachProps(obj, fn);
    expect(obj).to.deep.equal({ a: 1 });
    done();
  });

  it('Should process nothing when 3rd arg is undefined', function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = undefined;
    eachProps(obj, logger.bind(logs), opts);

    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, name: 'c' },
      },
    ]);
    done();
  });

  it('Should process nothing when 3rd arg is null', function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = null;
    eachProps(obj, logger.bind(logs), opts);

    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, name: 'c' },
      },
    ]);
    done();
  });

  it('Should process nothing when 3rd arg is a boolean', function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = true;
    eachProps(obj, logger.bind(logs), opts);
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, name: 'c' },
      },
    ]);
    done();
  });

  it('Should process nothing when 3rd arg is a number', function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = 123;
    eachProps(obj, logger.bind(logs), opts);
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, name: 'c' },
      },
    ]);
    done();
  });

  it('Should process nothing when 3rd arg is a string', function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = 'ABC';
    eachProps(obj, logger.bind(logs), opts);
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, name: 'c' },
      },
    ]);
    done();
  });

  it('Should process nothing when 3rd arg is an array', function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = [1, 2, 3];
    eachProps(obj, logger.bind(logs), opts);
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, name: 'c' },
      },
    ]);
    done();
  });

  it('Should process nothing when 3rd arg is a function', function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = fnNoReturn;
    eachProps(obj, logger.bind(logs), opts);
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, name: 'c' },
      },
    ]);
    done();
  });

  it('Should process nothing when 3rd arg is a typed object',
  function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = new Date(0);
    eachProps(obj, logger.bind(logs), opts);
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, name: 'c' },
      },
    ]);
    done();
  });

  it('Should process nothing when 3rd arg is an empty plain object',
  function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = {};
    eachProps(obj, logger.bind(logs), opts);
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, name: 'c' },
      },
    ]);
    done();
  });

  it('Should not sort keys when `.sort` of 3rd arg is undefined',
  function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = { sort: undefined };
    eachProps(obj, logger.bind(logs), opts);
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, sort: undefined, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, sort: undefined, name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, sort: undefined, name: 'c' },
      },
    ]);
    done();
  });

  it('Should not sort keys when `.sort` of 3rd arg is null', function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = { sort: null, };
    eachProps(obj, logger.bind(logs), opts);
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, sort: null, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, sort: null, name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, sort: null, name: 'c' },
      },
    ]);
    done();
  });

  it('Should not sort keys when `.sort` of 3rd arg is a boolean',
  function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = { sort: true };
    eachProps(obj, logger.bind(logs), opts);
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, sort: true, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, sort: true, name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, sort: true, name: 'c' },
      },
    ]);
    done();
  });

  it('Should not sort keys when `.sort` of 3rd arg is a number',
  function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = { sort: 123 };
    eachProps(obj, logger.bind(logs), opts);
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, sort: 123, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, sort: 123, name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, sort: 123, name: 'c' },
      },
    ]);
    done();
  });

  it('Should not sort keys when `.sort` of 3rd arg is a string',
  function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts ={ sort: 'ABC' };
    eachProps(obj, logger.bind(logs), opts);
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, sort: 'ABC', name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, sort: 'ABC', name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, sort: 'ABC', name: 'c' },
      },
    ]);
    done();
  });

  it('Should not sort keys when `.sort` of 3rd arg is an array',
  function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = { sort: [1,2,3] };
    eachProps(obj, logger.bind(logs), opts);
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, sort: [1,2,3], name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, sort: [1,2,3], name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, sort: [1,2,3], name: 'c' },
      },
    ]);
    done();
  });

  it('Should not sort keys when `.sort` of 3rd arg is a object',
  function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = { sort: { x: 1 } };
    eachProps(obj, logger.bind(logs), opts);
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, sort: { x: 1 }, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, sort: { x: 1 }, name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, sort: { x: 1 }, name: 'c' },
      },
    ]);
    done();
  });

  it('Should not sort keys when `.sort` of 3rd arg is a function which' +
     '\n\treturns nothing', function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = { sort: fnNoReturn };
    eachProps(obj, logger.bind(logs), opts);
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, sort: fnNoReturn, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, sort: fnNoReturn, name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, sort: fnNoReturn, name: 'c' },
      },
    ]);
    done();
  });

  it('Should not sort keys when `.sort` of 3rd arg is a function which' +
     '\n\treturns null', function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = { sort: fnReturnNull };
    eachProps(obj, logger.bind(logs), opts);
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, sort: fnReturnNull, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, sort: fnReturnNull,
        name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, sort: fnReturnNull, name: 'c' },
      },
    ]);
    done();
  });

  it('Should not sort keys when `.sort` of 3rd arg is a function which' +
     '\n\treturns a boolean', function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = { sort: fnReturnBool };
    eachProps(obj, logger.bind(logs), opts);
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, sort: fnReturnBool, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, sort: fnReturnBool,
        name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, sort: fnReturnBool, name: 'c' },
      },
    ]);
    done();
  });

  it('Should not sort keys when `.sort` of 3rd arg is a function which' +
     '\n\treturns a number', function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = { sort: fnReturnNum };
    eachProps(obj, logger.bind(logs), opts);
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, sort: fnReturnNum, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, sort: fnReturnNum,
        name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, sort: fnReturnNum, name: 'c' },
      },
    ]);
    done();
  });

  it('Should not sort keys when `.sort` of 3rd arg is a function which' +
     '\n\treturns a string', function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = { sort: fnReturnStr };
    eachProps(obj, logger.bind(logs), opts);
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, sort: fnReturnStr, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, sort: fnReturnStr,
        name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, sort: fnReturnStr, name: 'c' },
      },
    ]);
    done();
  });

  it('Should not sort keys when `.sort` of 3rd arg is a function which' +
     '\n\treturns a function', function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = { sort: fnReturnFunc };
    eachProps(obj, logger.bind(logs), opts);
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, sort: fnReturnFunc, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, sort: fnReturnFunc,
        name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, sort: fnReturnFunc, name: 'c' },
      },
    ]);
    done();
  });

  it('Should not sort keys when `.sort` of 3rd arg is a function which' +
     '\n\treturns an object', function(done) {
    var logs = [];

    var obj = { a: 1, b: { c: 2 } };
    var opts = { sort: fnReturnObj };
    eachProps(obj, logger.bind(logs), opts);
    expect(logs).to.deep.equal([
      { value: 1, keyChain: 'a', nodeInfo: { index: 0, count: 2, depth: 1,
        parent: { a: 1, b: { c: 2 } }, sort: fnReturnObj, name: 'a' },
      },
      { value: { c: 2 }, keyChain: 'b', nodeInfo: { index: 1, count: 2,
        depth: 1, parent: { a: 1, b: { c: 2 } }, sort: fnReturnObj,
        name: 'b' },
      },
      { value: 2, keyChain: 'b.c', nodeInfo: { index: 0, count: 1, depth: 2,
        parent: { c: 2 }, sort: fnReturnObj, name: 'c' },
      },
    ]);
    done();
  });

});

