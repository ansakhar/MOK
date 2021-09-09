const sum = (num1, num2) => {
    return num1 + num2
}

const substraction = (num1, num2) => {
    return num1 - num2
}

const mult = (num1, num2) => {
    return num1 * num2
}

const division = (num1, num2) => {
    return num1/num2
}

const print = (a,b) => {
    console.log("a =", a, "b =", b, "; sum =",sum(a,b),
 "substraction =",substraction(a,b),
 "mult =",mult(a,b),
"division =", division(a,b))
  }

  module.exports = {
    sum, substraction, mult, division, print
  }