module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  get_emoji: () => {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.7) {
      return `<span for="img" aria-label="lightbulb">💡</span>`;
    } else if (randomNum > 0.4) {
      return `<span for="img" aria-label="laptop">💻</span>`;
    } else {
      return `<span for="img" aria-label="gear">⚙️</span>`;
    }
  },
  json: function(obj) {
    return JSON.stringify(obj);
  },

  platform: function(ptype){
    if(ptype==="instagram"){
      return "fab fa-instagram"
    }else if (ptype==="facebook"){
      return "fab fa-square-facebook"
    }else if (ptype==="Twitter"){
      return "fab fa-twitter"
    }else if (ptype==="linkedin"){
      return "fab fa-linkedin-in"
    }else{
      return "fab fa-pinterest"
    }
  }
};


