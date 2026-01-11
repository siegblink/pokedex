/**
 * Format an ISO date string to a readable format.
 * @param {string} dateString The ISO date string to format
 * @returns {string}
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Get a descriptive label for ability power level.
 * @param {number} power The power level to get the label for
 * @returns {string}
 */
export function getPowerLabel(power: number): string {
  if (power >= 35) return "Very Strong";
  if (power >= 25) return "Strong";
  if (power >= 15) return "Medium";
  return "Weak";
}

/**
 * Get Tailwind color class for power level.
 * @param {number} power The power level to get the color class for
 * @returns {string}
 */
export function getPowerColorClass(power: number): string {
  if (power >= 35) return "text-red-600";
  if (power >= 25) return "text-orange-500";
  if (power >= 15) return "text-yellow-600";
  return "text-gray-500";
}
