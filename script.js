let ga_btn = document.getElementById("ga_btn");
let population_size = document.getElementById("population_size");
let mutation_rate = document.getElementById("mutation_rate");
let mating_rate = document.getElementById("mating_rate");
let generation = document.getElementById("generation");
let function_selection = document.getElementsByName("function_selection");

let population_size_p = document.getElementById("population_size_p");
let mutation_rate_p = document.getElementById("mutation_rate_p");
let mating_rate_p = document.getElementById("mating_rate_p");
let generation_p = document.getElementById("generation_p");

ga_btn.addEventListener("click", function () {
  let data = [];
  let function_select;
  for (const radio of function_selection) {
    if (radio.checked) {
      function_select = radio.value;
      break;
    }
  }
  let [target_funtion, fitness_function] =
    function_select_by_id(function_select);
  let run = 20;
  for (let i = 0; i < run; i++) {
    let result = ga(
      population_size.value,
      4,
      mutation_rate.value,
      mating_rate.value,
      generation.value,
      target_funtion,
      fitness_function,
      [-5, 5],
      10
    );
    let trace = {
      x: Array.from(Array(result.length).keys()),
      y: result,
      mode: "lines",
      line: { shape: "vh" },
      type: "scatter",
      name: "run" + parseInt(i + 1),
    };
    data.push(trace);
  }
  statistic = calculate_statistic(data, run);
  let title = generate_title(
    target_funtion.name,
    population_size.value,
    mutation_rate.value,
    mating_rate.value,
    generation.value,
    statistic
  );
  var layout = {
    title: title,
    xaxis: {
      title: "Generation",
    },
    yaxis: {
      title: "Minimum Function Value",
    },
  };

  Plotly.newPlot("plot", data, layout);
});

population_size.oninput = function () {
  population_size_p.innerHTML = population_size.value;
};

mating_rate.oninput = function () {
  mating_rate_p.innerHTML = mating_rate.value;
};

mutation_rate.oninput = function () {
  mutation_rate_p.innerHTML = mutation_rate.value;
};

generation.oninput = function () {
  generation_p.innerHTML = generation.value;
};

function calculate_statistic(data, run) {
  let best_of_each_run = data.map((x) => Math.min(...x.y));
  let mean = best_of_each_run.reduce((prev, curr) => prev + curr, 0) / run;
  let best = Math.min(...best_of_each_run);
  let worst = Math.max(...best_of_each_run);
  let std = Math.sqrt(
    best_of_each_run
      .map((x) => Math.pow(x - mean, 2))
      .reduce((prev, curr) => prev + curr, 0) / run
  );
  let result = [mean, best, worst, std].map((x) => x.toFixed(4));
  return result;
}

function generate_title(
  function_name,
  population_size,
  mutation_rate,
  mating_rate,
  generation,
  statistic
) {
  let title =
    "Genetic Algorithm | " +
    function_name +
    " | Population Size: " +
    population_size +
    " | Mutation Rate: " +
    mutation_rate +
    " | Mating Rate: " +
    mating_rate +
    " | Generation: " +
    generation +
    "<br />Mean: " +
    statistic[0] +
    " | Best: " +
    statistic[1] +
    " | Worst: " +
    statistic[2] +
    " | Std: " +
    statistic[3];
  return title;
}
