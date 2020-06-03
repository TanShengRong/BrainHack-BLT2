export function getLocationDefaults() {
    return fetch('https://wrm7pj3sz1.execute-api.us-east-1.amazonaws.com/staging/locations')
      .then((response) => response.json())
      .then((json) => {
        console.log(json.items);
        return json.items;
      })
      .catch((error) => {
        console.error(error);
      });
}
export function getLocationByRegion(region) {
  return fetch('https://wrm7pj3sz1.execute-api.us-east-1.amazonaws.com/staging/locations/' + region)
  .then((response) => response.json())
  .then((json) => {
    console.log(json.items);
    return json.items;
  })
  .catch((error) => {
    console.error(error);
  });
}
export function getFutureBookingInfo(region, locId) {
  return fetch('https://wrm7pj3sz1.execute-api.us-east-1.amazonaws.com/staging/locations/' + region + '/' + locId + '/future' )
  .then((response) => response.json())
  .then((json) => {
    console.log(json.items);
    return json.items;
  })
  .catch((error) => {
    console.error(error);
  });
}
export function getLocationByRegAndLoc(region, locId) {
  return fetch('https://wrm7pj3sz1.execute-api.us-east-1.amazonaws.com/staging/locations/' + region + '/' + locId)
  .then((response) => response.json())
  .then((json) => {
    console.log(json.items);
    return json.items;
  })
  .catch((error) => {
    console.error(error);
  });
}
export function getBookingsByUser(username) {
  return fetch('https://wrm7pj3sz1.execute-api.us-east-1.amazonaws.com/staging/users/' + username)
  .then((response) => response.json())
  .then((json) => {
    console.log(json.items);
    return json.items;
  })
  .catch((error) => {
    console.error(error);
  });
}
// add preprocessing into this to make data easier to access
// export function getLocationDetails(...) {
  // getLocationDefaults();
  // getFutureBookingInfo(region, locId);
// }