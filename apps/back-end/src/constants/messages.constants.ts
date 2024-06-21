export const StatusCode = {
  SUCCESS: 200,
  INCORRECT_PASSWORD: 401,
  VALIDATION_ERROR: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

export const StatusMessages = {
  LOGIN_SUCCESS: "Loged-In",
  SUCCESS: "Successful",
  INCORRECT_PASSWORD: "Incorrect Password!",
  VALIDATION_ERROR: "Validation Failed, Try again!",
  NOT_FOUND: "User not found!",
  INTERNAL_ERROR: "Something went wrong!",
};

export const ResponseMessages = {
  LOGIN_SUCCESS: "Loged-In successfully.",
  VIDEO_UPLOADED: "Video successfully uploaded!",
  INCORRECT_PASSWORD:
    "Incorrect password, please try again later with different password!",
  VALIDATION_ERROR:
    "Validation Failed, Please check your request and try again by using other credentials!",
  NOT_FOUND: "User not found, Please try again with different credentials!",
  INTERNAL_ERROR:
    "Something is wrong at server side, Please try again after some time!",
};
