import { urlPrefix } from "../../../helpers/getPrefixBasedOnEnvironment";

export default function changeMessageStatus(messageId: string, statusId: number): Promise<Response> {
    return fetch(urlPrefix() + '/message-status', {
        method: 'PATCH',
        body: JSON.stringify({
            messageId: messageId,
            statusId: statusId
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
      });
}