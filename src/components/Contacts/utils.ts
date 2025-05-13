export const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, '');

  if (numbers.length <= 1) {
    return numbers;
  } else if (numbers.length <= 4) {
    return `+${numbers.slice(0, 1)} ${numbers.slice(1)}`;
  } else if (numbers.length <= 7) {
    return `+${numbers.slice(0, 1)} ${numbers.slice(1, 4)} ${numbers.slice(4)}`;
  } else if (numbers.length <= 11) {
    return `+${numbers.slice(0, 1)} ${numbers.slice(1, 4)} ${numbers.slice(4, 7)} ${numbers.slice(7)}`;
  }

  return `+${numbers.slice(0, 1)} ${numbers.slice(1, 4)} ${numbers.slice(4, 7)} ${numbers.slice(7, 11)}`;
};

export const unformatPhoneNumber = (value: string): string => {
  return value.replace(/\D/g, '');
};
