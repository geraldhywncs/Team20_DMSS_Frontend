import axios from "axios";

async function callApi(apiEndpoint, method, data = null, params = null) {
  try {
    const config = {
      method: method.toUpperCase(),
      url: apiEndpoint,
      data: data,
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error(
      `Error calling API (${method} ${apiEndpoint}):`,
      error.message
    );
    throw error;
  }
}

export default callApi;
