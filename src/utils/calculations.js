export function calculateMileageAverage({
  initialMileage,
  currentMileage,
  initialDate,
}) {
  const startDate = new Date(initialDate);

  const today = new Date();

  const diffMs =
    today.getTime() - startDate.getTime();

  const daysElapsed = Math.floor(
    diffMs / (1000 * 60 * 60 * 24)
  );

  const kmsTraveled =
    currentMileage - initialMileage;

  const dailyAverage =
    kmsTraveled / daysElapsed;

  const annualAverage =
    dailyAverage * 365;

  return {
    kmsTraveled,
    daysElapsed,
    dailyAverage,
    annualAverage,
  };
}