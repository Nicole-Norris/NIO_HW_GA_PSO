let pso_btn = document.getElementById("pso_btn");
let swarm_size = document.getElementById("swarm_size");
let iteration = document.getElementById("iteration");
let function_selection_pso = document.getElementsByName(
  "function_selection_pso"
);
let a = document.getElementById("a");
let b = document.getElementById("b");
let swarm_size_p = document.getElementById("swarm_size_p");
let iteration_p = document.getElementById("iteration_p");
let a_p = document.getElementById("a_p");
let b_p = document.getElementById("b_p");

pso_btn.addEventListener("click", function () {
  let data = [];
  let function_select;
  for (const radio of function_selection_pso) {
    if (radio.checked) {
      function_select = radio.value;
      break;
    }
  }
  let [target_funtion, _] = function_select_by_id(function_select);
  let run = 20;
  for (let i = 0; i < run; i++) {
    let result = pso(
      swarm_size.value,
      4,
      [-5, 5],
      target_funtion,
      iteration.value,
      a.value,
      b.value
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
  let title = generate_title_pso(
    target_funtion.name,
    swarm_size.value,
    iteration.value,
    a.value,
    b.value,
    statistic
  );
  let layout = {
    title: title,
    xaxis: {
      title: "Iteration",
    },
    yaxis: {
      title: "Minimum Function Value",
    },
  };
  let config = {
    toImageButtonOptions: {
      filename: title,
    },
  };

  Plotly.newPlot("plot1", data, layout, config);
});

swarm_size.oninput = function () {
  swarm_size_p.innerHTML = swarm_size.value;
};

iteration.oninput = function () {
  iteration_p.innerHTML = iteration.value;
};

a.oninput = function () {
  a_p.innerHTML = a.value;
};

b.oninput = function () {
  b_p.innerHTML = b.value;
};

function generate_title_pso(
  function_name,
  swarm_size,
  iteration,
  a,
  b,
  statistic
) {
  return (
    "Particle Swarm Optimization | " +
    function_name +
    " | Swarm Size: " +
    swarm_size +
    " | Iteration: " +
    iteration +
    " | a: " +
    a +
    " | b: " +
    b +
    "<br />Mean: " +
    statistic[0] +
    "| Best: " +
    statistic[1] +
    " | Worst: " +
    statistic[2] +
    " | Standard Deviation: " +
    statistic[3]
  );
}
