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

export const fetchAllBrands = async (dispatch, endpoint) => {
  try {
    const ress = await axios.get(endpoint, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    const data = ress.data.data;

    dispatch({
      type: "SET_BRANDS",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchLense = async (setter, endpoint) => {
  try {
    const ress = await axios.get(endpoint, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    const data = ress.data.data;

    const obj = {
      name: data?.data?.name,
      lens_brand_Id: data?.data?.lens_brand_Id,
      lens_png: data?.data?.lens_png,
      lens_effect: data?.data?.lens_effect,
      is_active: data?.data?.is_active,
    };

    setter(obj);
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

    dispatch({ type: "LENSE_MODAL" });
    fetchLenses(dispatch, endpoint);
  } catch (err) {
    console.log(err);
  }
};

export const updateLense = async (dispatch, endpoint, payload, edit_lense) => {
  try {
    await axios.put(`${endpoint}?id=${edit_lense}`, payload, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    localStorage.removeItem("edit_lense");
    dispatch({ type: "LENSE_MODAL" });
    fetchLenses(dispatch, endpoint);
  } catch (err) {
    console.log(err);
  }
};

export async function fetchBrands(setter, endpoint) {
  try {
    const ress = await axios.get(endpoint, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    });
    const data = ress?.data?.data?.data;
    // console.log(data);
    setter(data);
  } catch (err) {
    console.log(err);
  }
}
