function sum(param1) {
    let currentSum = param1;
  
    function innerF(param2) {
        if (!arguments.length) {
          return currentSum;
        }

        currentSum += param2;
        return innerF;
    };
  
    return innerF;
};

console.log(sum(3)(5)(3)());
console.log(sum(5)(3)(7)());
