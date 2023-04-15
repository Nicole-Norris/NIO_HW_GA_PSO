function rosenbrock(x) {
  let sum = 0;
  for (var i = 0; i < x.length - 1; i++) {
    sum +=
      100 * Math.pow(x[i + 1] - Math.pow(x[i], 2), 2) +
      Math.pow(Math.pow(x[i], 2) - 1, 2);
  }
  return sum;
}

function fitness_function_ros(x) {
  return 1 / (1 + Math.abs(rosenbrock(x)));
}

function styblinski_tang(x) {
  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    const xi = x[i];
    sum += Math.pow(xi, 4) - 16 * Math.pow(xi, 2) + 5 * xi;
  }
  return 0.5 * sum;
}

function fitness_function_sty(x) {
  return Math.exp(-styblinski_tang(x)) / 100;
}

function rastrigin(x) {
  let sum = 0;
  for (var i = 0; i < x.length; i++) {
    sum += Math.pow(x[i], 2) - 10 * Math.cos(2 * Math.PI * x[i]);
  }
  return sum + 10 * x.length;
}

function fitness_function_ras(x) {
  return Math.exp(-rastrigin(x)) / 10;
}

function function_select_by_id(id) {
  switch (id) {
    case "1":
      return [rosenbrock, fitness_function_ros];
    case "2":
      return [styblinski_tang, fitness_function_sty];
    case "3":
      return [rastrigin, fitness_function_ras];
  }
}
