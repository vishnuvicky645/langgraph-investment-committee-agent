async function retry(fn, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (
        error.message.includes("503") &&
        i < retries - 1
      ) {
        console.log("Gemini busy. Retrying...");
        await new Promise(resolve =>
          setTimeout(resolve, 3000)
        );
      } else {
        throw error;
      }
    }
  }
}

module.exports = retry;