import { APIV1, DOMAIN } from "./config";

export const createEventApi = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(`${DOMAIN}${APIV1}/events`, requestOptions);

    if (response.ok) {
      const result = await response.json();

      return [result, ""];
    } else if (response.status == 401) {
      // } else {
      console.log("response was unsucessful");

      const errorMessage = await response.text();
      return [null, errorMessage];
    }
  } catch (error) {
    console.error("network errror: ", error);
    return [`server down: ${error}`];
  }
};
