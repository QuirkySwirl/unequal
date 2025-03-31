// Utility functions for managing like/dislike counts in localStorage

const STORAGE_KEY_PREFIX = 'wealthPlayground_likes_';

interface LikeCounts {
  likes: number;
  dislikes: number;
}

// Gets counts for a specific choice ID
export function getCounts(choiceId: string): LikeCounts {
  const key = `${STORAGE_KEY_PREFIX}${choiceId}`;
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Basic validation
      if (typeof parsed.likes === 'number' && typeof parsed.dislikes === 'number') {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Error reading like counts from localStorage:", error);
  }
  // Return default if not found or error
  return { likes: 0, dislikes: 0 };
}

// Updates counts for a specific choice ID
// action: 'like' or 'dislike'
// change: 1 to increment, -1 to decrement
export function updateCount(choiceId: string, action: 'like' | 'dislike', change: 1 | -1): LikeCounts {
  const key = `${STORAGE_KEY_PREFIX}${choiceId}`;
  const currentCounts = getCounts(choiceId); // Use const

  if (action === 'like') {
    currentCounts.likes = Math.max(0, currentCounts.likes + change); // Ensure count doesn't go below 0
  } else if (action === 'dislike') {
    currentCounts.dislikes = Math.max(0, currentCounts.dislikes + change); // Ensure count doesn't go below 0
  }

  try {
    localStorage.setItem(key, JSON.stringify(currentCounts));
  } catch (error) {
    console.error("Error writing like counts to localStorage:", error);
  }
  return currentCounts;
}

// Optional: Function to clear all counts (for debugging/reset)
export function clearAllCounts() {
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(STORAGE_KEY_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    console.log("Cleared all like/dislike counts from localStorage.");
  } catch (error) {
    console.error("Error clearing like counts from localStorage:", error);
  }
}
