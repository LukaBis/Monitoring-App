// This is sending request for statuses, but not all message statuses, just 2 of them.
// User can manually change status of the message, but user can only mark them as
// DELIVERED or REJECTED hence requerst for 2 statuses.

import { urlPrefix } from "../../../helpers/getPrefixBasedOnEnvironment";
import type { Status } from "../../types/Status";

export default function getStatuses(): Promise<Status[]> {
    return fetch(urlPrefix() + '/statuses-for-chaging-delivery-status', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
         .then((response) => response.json())
         .then((data) => {
            return data;
         })
         .catch((err) => {
            console.log(err.message);
         });
}