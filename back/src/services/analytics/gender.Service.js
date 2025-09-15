export function genderService(gender, genderCounts) {
  if (!gender) return;
  
  if (genderCounts.hasOwnProperty(gender)) {
    genderCounts[gender]++;
  } else {
    console.warn(`Unknown gender value: ${gender}`);
  }
}
