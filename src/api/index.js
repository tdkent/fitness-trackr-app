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

const getMe = async(token) => {
  try {
    const response = await fetch(`${DATABASE}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error(error);
    throw error
  }
}

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

const getMyPublicRoutines = async (username) => {
  try {
    const response = await fetch(`${DATABASE}/users/${username}/routines`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const postAddActivityToRoutine = async (
  routineId,
  activityId,
  count,
  duration
) => {
  try {
    const response = await fetch(
      `${DATABASE}/routines/${routineId}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          routineId,
          activityId,
          count,
          duration,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteActivityFromRoutine = async (token, routineActivityId) => {
  try {
    const response = await fetch(
      `${DATABASE}/routine_activities/${routineActivityId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const patchMyRoutine = async (token, routineId, name, goal) => {
  try {
    const response = await fetch(`${DATABASE}/routines/${routineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
      }),
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const patchMyRoutineActivity = async (
  token,
  routineActivityId,
  count,
  duration
) => {
  try {
    const response = await fetch(
      `${DATABASE}/routine_activities/${routineActivityId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          count,
          duration,
        }),
      }
    );
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteMyRoutine = async (token, routineId) => {
  try {
    const response = await fetch(`${DATABASE}/routines/${routineId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
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
  deleteMyRoutine,
  postAddActivityToRoutine,
  deleteActivityFromRoutine,
  patchMyRoutine,
  patchMyRoutineActivity,
  getMe
};
