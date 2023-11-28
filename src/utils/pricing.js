export const pricing = (price) => {
 return price * 0.91;
};

export const calculateTotalPrice = (it) => {
    return it.reduce((acc, item) => {
     const itemPrice = item.cardmarket?.prices?.averageSellPrice
      ? pricing(item.cardmarket?.prices?.averageSellPrice).toFixed(3)
      : 1;
     return acc + itemPrice * item.quantity;
    }, 0);
};