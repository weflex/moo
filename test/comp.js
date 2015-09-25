
const test = require('tape');
const comp = require('../lib/comp');

test('Comp.index', function (t) {
  t.plan(3);
  const prev = [
    [ 'a', {'foo': 'bar'} ],
    [ 'b', {'tar': 'get'} ],
  ];
  const idx = comp.index(prev);
  t.ok(idx instanceof Map, 'comp.index should return a Map object');
  t.equal(idx.get('a'), prev[0][1]);
  t.equal(idx.get('b'), prev[1][1]);
  t.end();
});

test('Comp.comp with equal', function (t) {
  t.plan(3);
  const prev = [
    [ 'a', {'foo': 'bar'} ],
    [ 'b', {'tar': 'get'} ],
  ];
  const next = [
    [ 'a', {'foo': 'bar'} ],
    [ 'b', {'tar': 'get'} ],
  ];
  const r = comp.comp(prev, next);
  t.deepEqual(r.addition, []);
  t.deepEqual(r.deletion, []);
  t.deepEqual(r.modified, []);
  t.end();
});

test('Comp.comp with addition', function (t) {
  t.plan(3);
  const prev = [
    [ 'a', {'foo': 'bar'} ],
    [ 'b', {'tar': 'get'} ],
  ];
  const next = [
    [ 'a', {'foo': 'bar'} ],
    [ 'b', {'tar': 'get'} ],
    [ 'c', 98765 ],
  ];
  const r = comp.comp(prev, next);
  t.deepEqual(r.addition, [
    { key: next[2][0], val: next[2][1] }
  ]);
  t.deepEqual(r.deletion, []);
  t.deepEqual(r.modified, []);
  t.end();
});

test('Comp.comp with deletion', function (t) {
  t.plan(3);
  const prev = [
    [ 'a', {'foo': 'bar'} ],
    [ 'b', {'tar': 'get'} ],
  ];
  const next = [
    [ 'a', {'foo': 'bar'} ],
  ];
  const r = comp.comp(prev, next);
  t.deepEqual(r.addition, []);
  t.deepEqual(r.deletion, [
    { key: prev[1][0], val: prev[1][1] }
  ]);
  t.deepEqual(r.modified, []);
  t.end();
});

test('Comp.comp with modified', function (t) {
  t.plan(3);
  const prev = [
    [ 'a', {'foo': 'bar'} ],
    [ 'b', {'tar': 'get'} ],
  ];
  const next = [
    [ 'a', {'foo': 'bar'} ],
    [ 'b', {'tar': 'got'} ],
  ];
  const r = comp.comp(prev, next);
  t.deepEqual(r.addition, []);
  t.deepEqual(r.deletion, []);
  t.deepEqual(r.modified, [
    { key: next[1][0], val: next[1][1] }
  ]);
  t.end();
});

