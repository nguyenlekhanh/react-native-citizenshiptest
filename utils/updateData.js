import { serverUrl, test_answer_2008 } from "./variables";

async function fetchData(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // You can handle errors here
    console.error('Error fetching data:', error);
    throw error;
  }
}

const updateAnswer = async (data) => {
  const url = serverUrl + test_answer_2008;

  fetchData(url, userInfo)
    .then((data) => {
      console.log(data);
      // Process the fetched data here
      updateTokenUserInfo(data, data);
    })
    .catch((error) => {
      // Handle errors if necessary
    });
}

export { updateAnswer };