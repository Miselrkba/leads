export const choice = (items) => {
    let idx = Math.floor(Math.random() * items.length);
    return items[idx];
  };