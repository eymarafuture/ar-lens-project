import axios from "axios";

export const fetchLenses = async (dispatch, endpoint) => {
  try {
    const ress = await axios.get(endpoint, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    const data = ress.data.data;

    dispatch({
      type: "SET_LENSES",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createLense = async (dispatch, endpoint, payload) => {
  try {
    await axios.post(endpoint, payload, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    fetchLenses(dispatch, endpoint);
  } catch (err) {
    console.log(err);
  }
};

export const updateLense = async (dispatch, endpoint, payload) => {
  try {
    await axios.put(endpoint, payload, {
      headers: {
        // Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    fetchLenses(dispatch, endpoint);
  } catch (err) {
    console.log(err);
  }
};
