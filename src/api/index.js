const DATABASE = "https://guarded-sea-48256.herokuapp.com/api";

// Users
const userRegisterLoginRequest = async (url, username, password) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Routines
const getPublicRoutinesRequest = async () => {
  try {
    const response = await fetch(`${DATABASE}/routines`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Activities
const getActivitiesRequest = async () => {
  try {
    const response = await fetch(`${DATABASE}/activities`);
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  DATABASE,
  getPublicRoutinesRequest,
  userRegisterLoginRequest,
  getActivitiesRequest,
};
