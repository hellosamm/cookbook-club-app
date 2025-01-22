import { DOMAIN } from "./config";

export const registerApi = async (bodyObject) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyObject),
  };

  try {
    const response = await fetch(`${DOMAIN}/users`, requestOptions);

    if (response.ok) {
      const data = await response.json();
      return [data, ""];
    }
    return ["", "server side error"];

    // Handle server errors
    // const error = await response.json().catch(() => null);
    // const errorMessage = error?.message || "An unknown server error occurred.";
    // return ["", errorMessage];
  } catch (error) {
    console.error("network errror: ", error);
    return ["", `server down: ${error}`];
  }
};

export const loginApi = async (bodyObject) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyObject),
  };

  try {
    const response = await fetch(`${DOMAIN}/users/sign_in/`, requestOptions);

    if (response.ok) {
      const data = await response.json();
      return [data, ""];
    }
    return ["", "server side error"];

    // Handle server errors
    // const error = await response.json().catch(() => null);
    // const errorMessage = error?.message || "An unknown server error occurred.";
    // return ["", errorMessage];
  } catch (error) {
    console.error("network errror: ", error);
    return ["", `server down: ${error}`];
  }
};
