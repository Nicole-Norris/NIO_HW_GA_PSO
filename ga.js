function ga(
  population_size,
  num_of_variable,
  mutation_rate,
  mating_rate,
  generation,
  target_funtion,
  fitness_function,
  initial_range = [-3, 3],
  mutation_ratio = 0.001
) {
  if ((mating_rate * population_size) % 2 != 0) {
    alert("mating rate * population size must be even number");
    return;
  }
  let chromosome = [];
  let best_result = [];
  chromosome = generate_chromosome(
    population_size,
    num_of_variable,
    initial_range
  );
  for (var i = 0; i < generation; i++) {
    let fitness = chromosome.map((x) => fitness_function(x));
    best_result.push(Math.min(...chromosome.map((x) => target_funtion(x))));
    let [crossover_selection, remain_children_index] = roulette_wheel_selection(
      fitness,
      mating_rate
    );
    let offspring = continuous_crossover(chromosome, crossover_selection);
    for (var j = 0; j < remain_children_index.length; j++) {
      offspring.push(chromosome[remain_children_index[j]]);
    }
    chromosome = mutation(offspring, mutation_rate, mutation_ratio);
  }
  return best_result;
}

function generate_chromosome(population_size, num_of_variable, initial_range) {
  let chromosomes = [];
  for (var i = 0; i < population_size; i++) {
    let chromosome = [];
    for (var j = 0; j < num_of_variable; j++) {
      chromosome.push(
        Math.random() * (initial_range[1] - initial_range[0]) + initial_range[0]
      );
    }
    chromosomes.push(chromosome);
  }
  return chromosomes;
}

function roulette_wheel_selection(fitness, mating_rate) {
  let total_fitness = fitness.reduce((prev, curr) => prev + curr, 0);
  let individual_fitness = fitness.map((x) => x / total_fitness);
  let cumulative_fitness = [];
  let cumulative_fitness_sum = 0;
  for (var i = 0; i < individual_fitness.length; i++) {
    cumulative_fitness_sum += individual_fitness[i];
    cumulative_fitness.push(cumulative_fitness_sum);
  }
  let selected_chromosome_index = [];
  for (var i = 0; i < Math.floor(mating_rate * fitness.length); i++) {
    let random_number = Math.random();
    for (var j = 0; j < cumulative_fitness.length; j++) {
      if (random_number < cumulative_fitness[j]) {
        selected_chromosome_index.push(j);
        break;
      }
    }
  }
  let remain_children = [];
  while (
    selected_chromosome_index.length + remain_children.length <
    fitness.length
  ) {
    let random_number = Math.floor(Math.random() * fitness.length);
    remain_children.push(random_number);
  }
  return [selected_chromosome_index, remain_children];
}

function continuous_crossover(chromosome, crossover_selection, rm = 0.5) {
  let children = [];
  for (var i = 0; i < crossover_selection.length; i += 2) {
    let parent1 = chromosome[crossover_selection[i]];
    let parent2 = chromosome[crossover_selection[i + 1]];
    let child1 = [];
    let child2 = [];
    for (var j = 0; j < parent1.length; j++) {
      child1.push(rm * parent1[j] + (1 - rm) * parent2[j]);
      child2.push(rm * parent2[j] + (1 - rm) * parent1[j]);
    }
    children.push(child1);
    children.push(child2);
  }
  return children;
}

function mutation(chromosome, mutation_rate, mutation_ratio = 0.001) {
  let mutated_chromosome = [];
  for (let i = 0; i < chromosome.length; i++) {
    for (let j = 0; j < chromosome[i].length; j++) {
      if (Math.random() < mutation_rate) {
        if (Math.random() < 0.5) {
          chromosome[i][j] = chromosome[i][j] + Math.random() * mutation_ratio;
        } else {
          chromosome[i][j] = chromosome[i][j] - Math.random() * mutation_ratio;
        }
      }
    }
    mutated_chromosome.push(chromosome[i]);
  }
  return mutated_chromosome;
}
