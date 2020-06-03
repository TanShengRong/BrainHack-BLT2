export const getLocationDefaults = () =>
  fetch('https://wrm7pj3sz1.execute-api.us-east-1.amazonaws.com/staging/locations')
  .then((response) => response.json());

export const getLocationByRegion = (region) =>
  fetch('https://wrm7pj3sz1.execute-api.us-east-1.amazonaws.com/staging/locations/' + region)
  .then((response) => response.json())
  .catch((error) => {
    console.error(error);
  });
export const getFutureBookingInfo = (region, locId) =>
  fetch('https://wrm7pj3sz1.execute-api.us-east-1.amazonaws.com/staging/locations/' + region + '/' + locId + '/future' )
  .then((response) => response.json())
  .catch((error) => {
    console.error(error);
  });
export const getLocationByRegAndLoc = (region, locId) =>
  fetch('https://wrm7pj3sz1.execute-api.us-east-1.amazonaws.com/staging/locations/' + region + '/' + locId)
  .then((response) => response.json())
  .catch((error) => {
    console.error(error);
  });
export const getBookingsByUser = (username) =>
  fetch('https://wrm7pj3sz1.execute-api.us-east-1.amazonaws.com/staging/users/' + username)
  .then((response) => response.json())
  .catch((error) => {
    console.error(error);
  });
// add preprocessing into this to make data easier to access
// export const getLocationDetails(...) {
  // getLocationDefaults();
  // getFutureBookingInfo(region, locId);
// }