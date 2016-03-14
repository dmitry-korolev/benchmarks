var Benchmark = require('benchmark'),
	suite = new Benchmark.Suite,
	string = randString(parseInt(process.argv[2]));

suite.add('O(n), string', function() {
	reverse1(string);
})
.add('O(n), array', function() {
	reverse1_imp(string);
})
.add('O(n / 2), array', function() {
	reverse2(string);
})
.add('O(x), native array', function() {
	reverse3(string);
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });

function reverse1(string) {
	var newString = '';

	for (var i = 1; i <= string.length; i++) {
		newString += string[string.length - i];
	}
	return newString;
}

function reverse1_imp(string) {
	var newString = [];

	for (var i = 1; i <= string.length; i++) {
		newString.push(string[string.length - i]);
	}
	return newString.join('');
}

function reverse2(string) {
	var arr= string.split(''),
		l = arr.length - 1,
		tmp;
	for (var i = 0; i < Math.ceil(l / 2); i++) {
		tmp = arr[i];
		arr[i] = arr[l - i];
		arr[l - i] = tmp;
	}
	return arr.join('');
}

function reverse3(string) {
	return string.split('').reverse().join('');
}

function randString(x){
    var s = [];
    while(s.length < x && x > 0){
        var r = Math.random();
        s.push(r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
    }
    return s.join('');
}
