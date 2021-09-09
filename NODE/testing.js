console.log("hei")
console.log("hello")

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

let a = 10
let b = 5


console.log("a =", a, "b =", b, "; sum =",sum(a,b),
 "substraction =",substraction(a,b),
 "mult =",mult(a,b),
"division =", division(a,b))

console.log(`${a} + ${b} = ${sum(a,b)}`)
console.log(`${a} - ${b} = ${substraction(a,b)}`)
