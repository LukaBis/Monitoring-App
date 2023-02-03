import { urlPrefix } from "../../../helpers/getPrefixBasedOnEnvironment";

export default function deleteContact(id: number): Promise<Response> {
    return fetch(urlPrefix() + '/contact/' + id, {
        method: 'DELETE',
        body: JSON.stringify({
            id: id
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
      })
}