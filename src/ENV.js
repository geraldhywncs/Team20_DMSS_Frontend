let apiHost;

function isHostedOnAWS() {
  const hostname = window.location.hostname;
  return hostname.includes("amazonaws.com");
}

// Example usage
if (isHostedOnAWS()) {
  apiHost = "http://3.26.56.52:5000";
} else {
  apiHost = "http://localhost:5000";
}

export const REACT_APP_apiHost = apiHost;
