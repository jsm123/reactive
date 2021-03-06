module.exports = function () {


//Array.prototype.map = function(projectionFunction) {
//    var results = [];
//    this.forEach(function(itemInArray) {
//        results.push(projectionFunction(itemInArray));
//
//    });
//
//    return results;
//};
// JSON.stringify([1,2,3].map(function(x) { return x + 1; })) === '[2,3,4]'

    Array.prototype.concatAll = function () {
        var results = [];
        this.forEach(function (subArray) {
            results.push.apply(results, subArray);
        });

        return results;
    };

    Array.prototype.concatMap = function (projectionFunctionThatReturnsArray) {
        return this.
            map(function (item) {
                return projectionFunctionThatReturnsArray(item);
            }).
            // apply the concatAll function to flatten the two-dimensional array
            concatAll();
    };

// [1,2,3].reduce(function(accumulatedValue, currentValue) { return accumulatedValue + currentValue; }); === [6];
// [1,2,3].reduce(function(accumulatedValue, currentValue) { return accumulatedValue + currentValue; }, 10); === [16];

    Array.prototype.reduce = function (combiner, initialValue) {
        var counter,
            accumulatedValue;

        // If the array is empty, do nothing
        if (this.length === 0) {
            return this;
        }
        else {
            // If the user didn't pass an initial value, use the first item.
            if (arguments.length === 1) {
                counter = 1;
                accumulatedValue = this[0];
            }
            else if (arguments.length >= 2) {
                counter = 0;
                accumulatedValue = initialValue;
            }
            else {
                throw "Invalid arguments.";
            }

            // Loop through the array, feeding the current value and the result of
            // the previous computation back into the combiner function until
            // we've exhausted the entire array and are left with only one function.
            while (counter < this.length) {
                accumulatedValue = combiner(accumulatedValue, this[counter])
                counter++;
            }

            return [accumulatedValue];
        }
    };
};