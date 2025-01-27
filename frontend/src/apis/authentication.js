import { DOMAIN } from "./config";

export const registerApi = async (userData) => {
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

export const loginApi = async (userData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(`${DOMAIN}/users/sign_in/`, requestOptions);

    if (response.ok) {
      const result = await response.json();
      console.log("response was successful");

      const authToken = response.headers.get("Authorization");
      console.log(authToken);

      return [result, authToken, ""];
    } else if (response.status == 401) {
      console.log("response was unsuccessful");

      const errorMessage = await response.text();
      return [null, null, errorMessage];
    }

    // if (response.ok) {
    //   const data = await response.json();
    //   const authToken = response.headers.get("Authorization");
    //   if (!authToken) {
    //     const errorMessage = await response.text();
    //     return [null, null, errorMessage];
    //   } else {
    //     return [data, authToken, ""];
    //   }
    // }

    // return [null, null, "server side error"];

    // Handle server errors
    // const error = await response.json().catch(() => null);
    // const errorMessage = error?.message || "An unknown server error occurred.";
    // return ["", errorMessage];
  } catch (error) {
    console.error("network errror: ", error);
    return ["", "", `server down: ${error}`];
  }
};
