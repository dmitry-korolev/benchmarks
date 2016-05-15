var Benchmark = require('benchmark'),
    expect = require('expect'),
    suite = new Benchmark.Suite,
    string = '01000110 01110010 01101001 01100101 01101110 01100100';

suite
    .add('Korolev v1', function() {
        one(string);
    })
    .add('Mulyavka', function() {
        two(string);
    })
    .add('Korolev v2', function() {
        three(string);
    })
    .add('Korolev v3', function() {
        four(string);
    })
    .add('Bokov', function() {
        five(string);
    })
    .add('Marchenko', function() {
        sixty(string);
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
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

const sixty = str => {
  for(var a = str.split(' '), l = a.length, i = 0, t = ''; l > i; i++) {
    t += String.fromCharCode(parseInt(a[i],2));
  }

  return t;
}

expect(one(string)).toBe('Friend');
expect(two(string)).toBe('Friend');
expect(three(string)).toBe('Friend');
//expect(four(string)).toBe('Friend');
//expect(five(string)).toBe('Friend');
expect(sixty(string)).toBe('Friend');
