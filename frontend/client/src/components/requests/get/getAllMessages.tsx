import { urlPrefix } from "../../../helpers/getPrefixBasedOnEnvironment";
import type { Message } from "../../types/Message";

export default function getAllMessages(numberOfMessages?: number): Promise<Message[]> {
    const sufix = numberOfMessages ? "?numberOfMessages=" + numberOfMessages : "";

    return fetch(urlPrefix() + '/messages' + sufix, {
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