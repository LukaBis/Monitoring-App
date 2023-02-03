import { urlPrefix } from "../../../helpers/getPrefixBasedOnEnvironment";

export default function sendMessage(textMessage: string, phoneNumber: string, contactId?: string): void {
    fetch(urlPrefix() + '/message', {
        method: 'POST',
        body: JSON.stringify({
          textMessage: textMessage,
          phoneNumber: phoneNumber,
          contactId: contactId ? contactId : null
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
}