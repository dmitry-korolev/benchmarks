var Benchmark = require('benchmark'),
    expect = require('expect'),
    suite = new Benchmark.Suite,
    string = '01000110 01110010 01101001 01100101 01101110 01100100',
    binToCharMap = {};

for (let i = 0; i < 256; i++) {
    binToCharMap[('00000000' + i.toString(2)).substr(-8)] = String.fromCharCode(i);
}

suite
    .add('one: ES6 spread', () => one(string))
    .add('two: Split/map', () => two(string))
    .add('three: Apply', () => three(string))
    .add('four: do while each bit', () => four(string))
    .add('five: do while each byte', () => five(string))
    .add('six: split / for / string +=', () => six(string))
    .add('seven: split / for / arr.push / apply', () => seven(string))
    .add('eight: split / for / arr.push / join', () => eight(string))
    .add('nine: same + t[t.length]', () => nine(string))
    .add('ten: same + memo arr length', () => ten(string))
    .add('eleven: split / forEach', () => eleven(string))
    .add('twelve: hashmap', () => twelve(string))
    .on('cycle', event => console.log(String(event.target)))
    .on('complete', function() {console.log('Fastest is ' + this.filter('fastest').map('name'))})
    .run({ 'async': true });


const one = str => String.fromCharCode( ...str.split(' ').map(s => parseInt(s, 2)) );
const two = str => str.split(' ').map(s => String.fromCharCode(parseInt(s,2))).join('');
const three = str => String.fromCharCode.apply( String, str.split(' ').map(s => parseInt(s, 2)) );
const four = str => {
    var i = 0, tmp = '', newStr = '';
    str += ' ';

    do {
        tmp += str[i];
        i += 1;
        if (tmp.length % 9 === 0) {
            newStr += String.fromCharCode(parseInt(tmp, 2));
            tmp = '';
        }
    } while (i <= str.length);

    return newStr;
};
const five = str => {
    var c = '', r = '', i = 0;

    do {
        c = str.substr(i, 8);
        r += String.fromCharCode(parseInt(c, 2)); i += 9;
    } while (c);

    return r;
};
const six = str => {
  for(var a = str.split(' '), l = a.length, i = 0, t = ''; l > i; i++) {
    t += String.fromCharCode(parseInt(a[i],2));
  }

  return t;
};
const seven = str => {
    for(var a = str.split(' '), l = a.length, i = 0, t = []; l > i; i++) {
        t.push(parseInt(a[i],2));
    }
    return String.fromCharCode.apply(String, t);
};
const eight = str => {
    for(var a = str.split(' '), l = a.length, i = 0, t = []; l > i; i++) {
        t.push(String.fromCharCode(parseInt(a[i],2)));
    }
    return t.join('');
};
const nine = str => {
    for(var a = str.split(' '), l = a.length, i = 0, t = []; l > i; i++) {
        t[t.length] = String.fromCharCode(parseInt(a[i],2));
    }
    return t.join('');
};
const ten = str => {
    var a = str.split(' '),
        l = a.length,
        t = new Array(l),
        i = 0;

    for(; l > i; i++) {
        t[i] = String.fromCharCode(parseInt(a[i],2));
    }
    return t.join('');
};
const eleven = str => {
    var t = [];

    str.split(' ').forEach(s => {
        t.push(String.fromCharCode(parseInt(s,2)));
    });

    return t.join('');
};
const twelve = str => {
    for(var a = str.split(' '), l = a.length, i = 0, t = ''; l > i; i++) {
        t += binToCharMap[a[i]];
    }
    return t;
};

expect(one(string)).toBe('Friend');
expect(two(string)).toBe('Friend');
expect(three(string)).toBe('Friend');
// expect(four(string)).toBe('Friend');
// expect(five(string)).toBe('Friend');
expect(six(string)).toBe('Friend');
expect(seven(string)).toBe('Friend');
expect(eight(string)).toBe('Friend');
expect(nine(string)).toBe('Friend');
expect(ten(string)).toBe('Friend');
expect(eleven(string)).toBe('Friend');
expect(twelve(string)).toBe('Friend');
