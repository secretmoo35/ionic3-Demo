export const configuration = { //' Dev
  baseURL: '',
  oneSignalID: '',
  firebaseID: '',
  storage: 'app_dev',
};

// export const configuration = { //' QAS
//   baseURL: '',
//   oneSignalID: '',
//   firebaseID: '',
//   storage: 'app_qas',
// };

// export const configuration = { //' PRD
//   baseURL: '',
//   oneSignalID: '',
//   firebaseID: '',
//   storage: 'app_prd',
// };

export let config = {
  baseURL: configuration.baseURL,
  oneSignalID: configuration.oneSignalID,
  firebaseID: configuration.firebaseID,
  storage: configuration.storage,
};
