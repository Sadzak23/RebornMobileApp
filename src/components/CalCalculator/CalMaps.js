import { faSwimmer, faBiking, faWalking, faRunning, faHiking, faSkiing } from '@fortawesome/free-solid-svg-icons';

////////// METS //////////

const metRunning = {
  // pace: met
  "7:30": 8.3,
  "7:00": 9.1,
  "6:30": 9.5,
  "6:00": 10,
  "5:30": 10.6,
  "5:00": 11.7,
  "4:30": 12.1,
  "4:00": 12.9,
  "3:30": 15.8,
};

const metCycling = {
  // speed: met
  "Slow": 5,
  "Light": 7.8,
  "Moderate": 9.5,
  "Fast": 11,
  "Race": 12,
  "Sprint race": 13.2
};

const metWalking = {
  // speed: met
  "Slow": 3.2,
  "Moderate": 5,
  "Fast": 8,
};

const metSwimming = {
  "Breaststroke" : 5.3,
  "Crawl slow" : 5.8,
  "Crawl medium" : 8,
  "Crawl fast" : 10,
  "Butterfly" : 13.8
};

const metHiking = {
  "Normal pace" : 5.3,
  "Cross country" : 6.0,
  "With 10kg backpack" : 7.3,
  "With 20kg backpack" : 8.3,
};

const metSkiing = {
  "Light effort" : 4.8,
  "Moderate effort" : 5.8,
  "Vigorous effort" : 8,
  "Vigorous, cross country" : 12
};

////////// Activities //////////

export const metActivity = {
  "Running": metRunning,
  "Cycling": metCycling,
  "Walking": metWalking,
  "Swimming": metSwimming,
  "Hiking": metHiking,
  "Skiing": metSkiing,
};

////////// Icons //////////

export const icons = {
  "Running": faRunning,
  "Cycling": faBiking,
  "Walking": faWalking,
  "Swimming": faSwimmer,
  "Hiking": faHiking,
  "Skiing": faSkiing,
};

////////// Labels //////////

export const IntensityLabel = {
  "Running": "Running Pace",
  "Cycling": "Cycling Speed",
  "Walking": "Walking Speed",
  "Swimming": "Swimming Style",
  "Hiking": "Hiking Style",
  "Skiing": "Skiing Effort",
}

export const ResultLabel = {
  "Running": "run",
  "Cycling": "cycle",
  "Walking": "walk",
  "Swimming": "swim",
  "Hiking": "hike",
  "Skiing": "ski",
}
