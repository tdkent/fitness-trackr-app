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

// My Routines
const postCreateRoutineRequest = async ({ token, name, goal, isPublic }) => {
  try {
    const response = await fetch(`${DATABASE}/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getMyPublicRoutines = async(username) => {
  try {
    const response = await fetch(`${DATABASE}/users/${username}/routines`);
    const data = await response.json();
    return data;
  }
  catch(error) {
    console.error(error);
    throw error;
  }
}

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

const postCreateActivityRequest = async ({ name, description }) => {
  try {
    const response = await fetch(`${DATABASE}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
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
  postCreateRoutineRequest,
  postCreateActivityRequest,
  getMyPublicRoutines,
};
