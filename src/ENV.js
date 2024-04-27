let apiHost;

function isHostedOnAWS() {
  const hostname = window.location.hostname;
  return hostname.includes("amazonaws.com");
}


if (isHostedOnAWS()) {
  apiHost = "http://13.210.101.186:5000";
} else {
  apiHost = "http://54.252.168.241:5000";
  //apiHost = "http://172.20.0.1:5000";
  // apiHost = "http://127.0.0.1:5000";
}

export const REACT_APP_apiHost = apiHost;
