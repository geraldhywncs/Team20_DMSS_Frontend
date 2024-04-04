const constants = {
  api: {
    API_URL: "https://api.example.com",
  },
  app: {
    APP_TITLE: "💵MoneyGoWhere",
    // TEMP_USER: "Steven Limmy 帅哥", //Temp remove once logic is in place
    USERFIRSTNAME: localStorage.getItem("userFirstName"), //Temp remove once logic is in place

  },
  errors: {
    NETWORK_ERROR: "Network error. Please try again later.",
    AUTH_ERROR: "Authentication failed. Please log in again.",
  },
  months: {
    Jan: "Jan",
    Feb: "Feb",
    Mar: "Mar",
    Apr: "Apr",
    May: "May",
    Jun: "Jun",
    Jul: "Jul",
    Aug: "Aug",
    Sep: "Sep",
    Oct: "Oct",
    Nov: "Nov",
    Dec: "Dec",
  },
};

export default constants;
