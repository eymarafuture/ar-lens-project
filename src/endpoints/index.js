import axios from "axios";

export const fetchAllLenses = async (dispatch, endpoint, setLoading) => {
  // re-deploy
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
    {
      setLoading && setLoading(false);
    }
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

export const fetchBrand = async (setter, endpoint) => {
  try {
    const ress = await axios.get(endpoint, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    const data = ress.data.data;

    const obj = {
      brand_name: data?.data?.brand_name,
      brand_logo: data?.data?.brand_logo,
      is_active: data?.data?.is_active,
    };

    setter(obj);
  } catch (err) {
    console.log(err);
  }
};

export const createLense = async (dispatch, endpoint, payload, page, limit) => {
  try {
    await axios.post(endpoint, payload, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    dispatch({ type: "LENSE_MODAL" });
    fetchAllLenses(dispatch, `${endpoint}?page=${page}&limit=${limit}`);
  } catch (err) {
    console.log(err);
  }
};

export const createBrand = async (dispatch, endpoint, payload) => {
  try {
    await axios.post(endpoint, payload, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    dispatch({ type: "BRAND_MODAL" });
    fetchAllBrands(dispatch, endpoint);
  } catch (err) {
    console.log(err);
  }
};

export const updateLense = async (dispatch, endpoint, payload, edit_lense, page, limit) => {
  try {
    await axios.put(`${endpoint}?id=${edit_lense}`, payload, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    localStorage.removeItem("edit_lense");
    dispatch({ type: "LENSE_MODAL" });
    fetchAllLenses(dispatch, `${endpoint}?page=${page}&limit=${limit}`);
  } catch (err) {
    console.log(err);
  }
};

export const updateBrand = async (dispatch, endpoint, payload, edit_brand) => {
  try {
    await axios.put(`${endpoint}?id=${edit_brand}`, payload, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    localStorage.removeItem("edit_brand");
    dispatch({ type: "BRAND_MODAL" });
    fetchAllBrands(dispatch, endpoint);
  } catch (err) {
    console.log(err);
  }
};

export const deleteLense = async (dispatch, endpoint, id, setLoading, page, limit) => {
  try {
    setLoading && setLoading(true);
    await axios.delete(`${endpoint}?id=${id}`, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    });
    dispatch({
      type: "REFRESH_PAGE"
    })
    fetchAllLenses(dispatch, `${endpoint}?page=${page}&limit=${limit}`, setLoading);
  } catch (err) {
    setLoading && setLoading(false);
    console.log(err);
  }
};

// For Dropdown
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

// For Dashboard
export async function fetchLenses(setter, endpoint) {
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
