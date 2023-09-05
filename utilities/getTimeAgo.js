function getTimeAgo(timestamp) {
  const now = new Date();
  const createdDate = new Date(timestamp);
  const timeDiffInSeconds = Math.floor((now - createdDate) / 1000); // Time difference in seconds

  if (timeDiffInSeconds < 60) {
    return `${timeDiffInSeconds} seconds ago`;
  } else if (timeDiffInSeconds < 3600) {
    const minutes = Math.floor(timeDiffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDiffInSeconds < 86400) {
    const hours = Math.floor(timeDiffInSeconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    const days = Math.floor(timeDiffInSeconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
}

// Example usage
// const createdAtTimestamp = new Date("2023-08-10T12:00:00Z"); // Replace with your actual timestamp
// const timeAgo = getTimeAgo(createdAtTimestamp);
// console.log(timeAgo); // Output: "1 day ago"

module.exports = { getTimeAgo };
