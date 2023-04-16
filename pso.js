function pso(
  swarm_size,
  num_of_variable,
  initial_range,
  target_function,
  max_iteration,
  a,
  b
) {
  let swarm = [];
  let best_results = [];
  let lopt = [];
  let best_value = Infinity;
  let velocity = [];
  let [a_min, b_min, a_max, b_max] = [a / 2, b / 2, parseInt(a), parseInt(b)];

  for (let i = 0; i < swarm_size; i++) {
    let particle = [];
    let particle_velocity = [];
    for (let j = 0; j < num_of_variable; j++) {
      particle.push(
        Math.random() * (initial_range[1] - initial_range[0]) + initial_range[0]
      );
      particle_velocity.push(0);
    }
    swarm.push(particle);
    velocity.push(particle_velocity);
  }

  for (let i = 0; i < max_iteration; i++) {
    let function_value = swarm.map((x) => target_function(x));
    let gopt = swarm[function_value.indexOf(Math.min(...function_value))];
    if (Math.min(...function_value) < best_value) {
      best_value = Math.min(...function_value);
      lopt = gopt;
    }
    best_results.push(best_value);
    for (let j = 0; j < swarm_size; j++) {
      for (let k = 0; k < num_of_variable; k++) {
        velocity[j][k] =
          velocity[j][k] +
          a * Math.random() * (lopt[k] - swarm[j][k]) +
          b * Math.random() * (gopt[k] - swarm[j][k]);
        swarm[j][k] += velocity[j][k];
      }
    }
    a = ((a_min - a_max) * (i + 1)) / max_iteration + a_max;
    b = ((b_min - b_max) * (i + 1)) / max_iteration + b_max;
  }
  return best_results;
}
