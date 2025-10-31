/* This page is created and explained by ChatGPT */

/**
 * Returns the Date object for Monday of a specified week relative to the current week.
 *
 * @param {number} [weekOffset=0] - The number of weeks to offset from the current week.
 *   - Use `0` for this week's Monday.
 *   - Use `-1` for last week's Monday.
 *   - Use `1` for next week's Monday.
 * @returns {Date} A Date object set to Monday of the specified week, with the time reset to midnight.
 *
 * @example
 * getMonday();    // Returns this week's Monday
 * getMonday(-1);  // Returns last week's Monday
 * getMonday(1);   // Returns next week's Monday
 */
const getMonday = (weekOffset = 0) => {
    // Create a new Date object representing the current date and time
    const today = new Date();

    // Get the current day of the week as a number (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const day = today.getDay(); 

    // Calculate how many days to move backward (or forward) to reach Monday.
    // Explanation of parts:
    // - today.getDate(): returns the current day of the month (e.g., 28 for October 28).
    // - day: current weekday number (0–6).
    // - (day === 0 ? -6 : 1): special case for Sundays (0). 
    //   If today is Sunday, go back 6 days to get Monday of the *same* week.
    //   Otherwise, subtract to find the Monday before or after today.
    // - weekOffset * 7: moves forward or backward by whole weeks (e.g., -1 week = -7 days).
    const diff = today.getDate() - day + (day === 0 ? -6 : 1) + weekOffset * 7;

    // Set the 'today' Date object’s day to the calculated Monday date
    // This modifies 'today' and returns the new timestamp, which we pass into a new Date() object
    const monday = new Date(today.setDate(diff));

    // Reset the time portion of the Date object to midnight (00:00:00.000)
    // This ensures only the date part matters, with no time offsets
    monday.setHours(0, 0, 0, 0);

    // Return the final Date object representing that Monday
    return getISOShortDate(monday);
}

/**
 * Converts a given date input into a short ISO 8601 date string (YYYY-MM-DD).
 *
 * @param {Date|string|number} dateInput - The date to format. Can be a Date object,
 *   a date string (e.g., "2025-10-28"), or a timestamp (milliseconds since epoch).
 * @returns {string} A formatted date string in ISO short format (YYYY-MM-DD).
 *
 * @example
 * getISOShortDate(new Date());      // "2025-10-28"
 * getISOShortDate("2025-01-15");   // "2025-01-15"
 * getISOShortDate(1735440000000);  // "2024-12-29"
 */
const getISOShortDate = (dateInput) => {
    const date = new Date(dateInput).toISOString().split('T')[0]
    return date;
};

// This code block will only run if the file is executed directly
if (require.main === module) {
    const lastMonday = getMonday(-1);
    const thisMonday = getMonday(0);
    const nextMonday = getMonday(1);

    console.log("Last week's Monday:", lastMonday);
    console.log("This week's Monday:", thisMonday);
    console.log("Next week's Monday:", nextMonday);
}

// Export the functionality
module.exports = getMonday;