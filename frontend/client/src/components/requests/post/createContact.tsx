import { urlPrefix } from "../../../helpers/getPrefixBasedOnEnvironment";

export default function createContact(name: string, number: string): Promise<Response> {
    return fetch(urlPrefix() + '/contact', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            number: number
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
}