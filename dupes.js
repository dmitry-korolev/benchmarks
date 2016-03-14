(function() {
    'use strict';

    // Helper functions
    function generateArray(n) {
        var arr = [],
            i;
        for (i = 0; i < n; i += 1) {
            arr.push({
                id: getRandomInt(0, n)
            });
        }
        return arr;
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function basicCompareArrays(arr1, arr2) {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    }

    function hasSimilar1(arr) {
        var newArr = JSON.parse(JSON.stringify(arr)),
            ids = [],
            length = newArr.length,
            found,
            i;

        for (i = 0; i < length; i += 1) {
            found = ids.indexOf(newArr[i].id);

            if (found !== -1) {
                newArr[found].hasSame = true;
                newArr[i].hasSame = true;
            } else {
                newArr[i].hasSame = false;
            }
            ids.push(newArr[i].id);
        }
        return newArr;
    }

    function hasSimilar2(arr) {
        var newArr = JSON.parse(JSON.stringify(arr)),
            hash = {},
            length = newArr.length,
            i;

        for (i = 0; i < length; i += 1) {
            if (hash[newArr[i].id]) {
                newArr[i].hasSame = true;
                hash[newArr[i].id].hasSame = true;
            } else {
                newArr[i].hasSame = false;
                hash[newArr[i].id] = newArr[i];
            }
        }
        return newArr;
    }

    console.time('Generate array');
    var arr = generateArray(parseInt(process.argv[2]));
    console.timeEnd('Generate array');

    console.time('F1');
    var arr1 = hasSimilar1(arr);
    console.timeEnd('F1');

    console.time('F2');
    var arr2 = hasSimilar2(arr);
    console.timeEnd('F2');

    // console.log('Original array: ', arr);
    // console.log('Array1: ', arr1);
    // console.log('Array2: ', arr2);
    console.log('Arrays equality: ', basicCompareArrays(arr1, arr2));
})();
