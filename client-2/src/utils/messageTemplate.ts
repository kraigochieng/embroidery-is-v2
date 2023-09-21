import { MessageTemplateType } from "../enums/MessageTemplateType"

type MessageTemplate = {
    type: MessageTemplateType,
    content: string
}

const messageTemplate = (type: MessageTemplateType, content: string): MessageTemplate => ({ type, content })

export default messageTemplate