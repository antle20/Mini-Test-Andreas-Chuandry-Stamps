function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

const output = [];

for (let i = 100; i >= 1; i--) {
  // 1. skip if prime numbers
  if (isPrime(i)) {
    continue;
  }

  // 2. Check 3 and 5
  if (i % 3 === 0 && i % 5 === 0) {
    output.push("FooBar");
  } else if (i % 3 === 0) {
    output.push("Foo");
  } else if (i % 5 === 0) {
    output.push("Bar");
  } else {
    output.push(i);
  }
}

console.log(output.join(" "));