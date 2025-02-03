import { DOMAIN } from "./config";

export const submitEvent = async (userData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(`${DOMAIN}/users`, requestOptions);

    if (response.ok) {
      const result = await response.json();
      const authToken = response.headers.get("Authorization");

      return [result, authToken, ""];
    } else if (response.status == 422) {
      // } else {
      console.log("response was unsucessful");

      const errorMessage = await response.json();
      return [null, null, errorMessage];
    }
  } catch (error) {
    console.error("network errror: ", error);
    return ["", `server down: ${error}`];
  }
};
