
  function getRandomNews(array) {
    const length = array.length;
    const numItemsToPick = Math.ceil(length * 0.1); // 20% of array length, rounded up
  
    const randomItems = [];
    const indexes = Array.from({ length }, (_, i) => i); // Create an array of indexes
  
    for (let i = 0; i < numItemsToPick; i++) {
      const randomIndex = Math.floor(Math.random() * indexes.length); // Pick a random index
      const pickedIndex = indexes.splice(randomIndex, 1)[0]; // Remove the index from the array and get its value
      randomItems.push(array[pickedIndex]); // Add the corresponding item to the result array
    }
  
    return randomItems;
  }

function generateId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }
  
  return id;
}
module.exports = {
  getRandomNews,
  generateId
}