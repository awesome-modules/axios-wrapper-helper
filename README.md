# axios-wrapper-helper

## Installation

```sh
npm install axios-wrapper-helper
```

or

```sh
yarn add axios-wrapper-helper
```

## Usage

- First step is to setup general config:

```js
import { set_general_config } from "axios-wrapper-helper";

const BASE_URL = "base_url";
const TOKEN_HEADER_KEY = "token_key_for_header"; // eg. 'Authorization'

export const setUp = () => {
  set_general_config(BASE_URL, TOKEN_HEADER_URL);
};
```

- Next set is to use the provided resuable function:

```js
import { async_func_data } from "axios-wrapper-helper";

try {

  const response = await async_func_data<ResponseType>(ROUTE, PARAMS_OR_DATA, METHOD, IS_TOKEN_REQUIRED, TOKEN);
  // Handle response
  
} catch (err) {

  // Handle error
  
}
```

| Param             | Description                                                       | Example                        |
| ----------------- | ----------------------------------------------------------------- | ------------------------------ |
| ROUTE             | API endpoint                                                      | /auth/login                    |
| PARAMS_OR_DATA    | Request body in case of post request and params in case of others | {name: "XYZ", email:"emailid"} |
| METHOD            | REQUEST_TYPE                                                      | "get","post","put","delete"    |
| IS_TOKEN_REQUIRED | For authenticated routes, by default set to false.                | true or false (boolean)        |
| TOKEN             | Required token                                                    | "asdfghj" (string)             |

ResponseType is the custom response type to be provided for making it typesafe, by default it's any.
