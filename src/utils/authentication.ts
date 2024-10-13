import { store } from "@/redux/store";

export const authorizationFormHeaders = () => {
  const {
    authentication: { accessToken },
  } = store.getState();

  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  };
};

export const authorizationHeaders = () => {
  const {
    authentication: { accessToken },
  } = store.getState();

  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export const getAccess = () => {
  const {
    authentication: { accessToken },
  } = store.getState();

  return `Bearer ${accessToken}`;
};

export const getUserData = () => {
  const {
    authentication: { userData },
  } = store.getState();

  return userData;
};

export const getRefreshToken = () => {
  const {
    authentication: { refreshToken },
  } = store.getState();

  return refreshToken;
};
