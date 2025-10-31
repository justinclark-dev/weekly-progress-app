/**
 * Formats a date string like "2025-10-27" into a human-readable format:
 * "Monday, October 27th, 2025"
 *
 * This function ensures the date is interpreted in the user's **local timezone**
 * rather than UTC, by manually constructing the Date object from parts.
 *
 * @param {string} dateString - A date in the format "YYYY-MM-DD"
 * @returns {string} A formatted string like "Monday, October 27th, 2025"
 */
function formatDate(dateString) {

  // Split the incoming string into year, month, and day parts
  // "2025-10-27" → ["2025", "10", "27"]
  const [year, month, day] = dateString.split('-').map(Number);

  // Create a new Date object using local time.
  // Note: month - 1 because JavaScript months are 0-based (0 = January, 11 = December)
  const date = new Date(year, month - 1, day);

  // Get the full weekday name (e.g., "Monday") based on local settings
  const dayName = date.toLocaleString(undefined, { weekday: 'long' });

  // Get the full month name (e.g., "October") based on local settings
  const monthName = date.toLocaleString(undefined, { month: 'long' });

  // Get the numeric day of the month (e.g., 27)
  const dayNum = date.getDate();

  // Get the full year (e.g., 2025)
  const yearNum = date.getFullYear();

  /**
   * Adds the proper ordinal suffix to a given day number.
   * For example: 1 → "1st", 2 → "2nd", 3 → "3rd", 4 → "4th", etc.
   *
   * @param {number} n - The day of the month
   * @returns {string} The day with its ordinal suffix (e.g., "27th")
   */
  function getOrdinalSuffix(n) {
    // Special cases: 11, 12, and 13 always end with "th"
    if (n >= 11 && n <= 13) return n + "th";

    // Handle other endings based on the last digit
    switch (n % 10) {
      case 1: return n + "st";
      case 2: return n + "nd";
      case 3: return n + "rd";
      default: return n + "th";
    }
  }

  // Build and return the final formatted date string
  return `${dayName}, ${monthName} ${getOrdinalSuffix(dayNum)}, ${yearNum}`;
}

// This code block will only run if the file is executed directly
if (require.main === module) {
    // Example usage:
    console.log(formatDate("2025-10-27"));
    // Output: "Monday, October 27th, 2025"
}

module.exports = formatDate;