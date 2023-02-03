import { urlPrefix } from "../../../helpers/getPrefixBasedOnEnvironment";
import type { Contact } from "../../types/Contact";

export default function getAllContacts(): Promise<Contact[]> {
    return fetch(urlPrefix() + '/contacts', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
         .then((response) => response.json())
         .then((data) => {
            // loading field is used later for displaying loader component
            // while waiting for response
            data.forEach((contact: Contact) => contact.loading = false);
            return data;
         })
         .catch((err) => {
            console.log(err.message);
         });
}