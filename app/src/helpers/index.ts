export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(navigator.language);
};

export const getAge = (timestamp: number) => {
  const now = new Date();
  const dateOfBirth = new Date(timestamp);
  let age = now.getFullYear() - dateOfBirth.getFullYear();
  const monthOffset = now.getMonth() - dateOfBirth.getMonth();

  const isBirthdayPassed =
    monthOffset < 0 ||
    (monthOffset === 0 && now.getDate() < dateOfBirth.getDate());

  return isBirthdayPassed ? age - 1 : age;
};

export const getRandomDate = () => {
  const maxDate = Date.now();
  const timestamp = Math.floor(Math.random() * maxDate);
  return new Date(timestamp).getTime();
};
