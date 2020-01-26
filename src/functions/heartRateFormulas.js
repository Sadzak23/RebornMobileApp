export const maxHR = (age) => Math.round(211 - (age * 0.64))
export const percOfMax = (current, max) => Math.round(current / max * 100)
export const caloriesPerMin = ({ age, hr, weight, gender }) => {
  return gender === 'male' ?
    ((0.6309 * hr) + (0.1988 * weight) + (0.2017 * age) - 55.0969) / 4.184 :
    ((0.4472 * hr) - (0.1263 * weight) + (0.074 * age) - 20.4022) / 4.184
}

export const hrZone = (hr, maxHR) => {
  if (hr < maxHR * 0.6) return 1
  else if (hr >= maxHR * 0.6 && hr < maxHR * 0.7) return 2
  else if (hr >= maxHR * 0.7 && hr < maxHR * 0.8) return 3
  else if (hr >= maxHR * 0.8 && hr < maxHR * 0.9) return 4
  else if (hr >= maxHR * 0.9) return 5
}