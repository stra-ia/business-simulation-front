import { BriefPoints } from '@/atoms/briefPoints'
import {
  FunctionDeclaration,
  FunctionDeclarationSchemaType,
  Tool
} from '@google/generative-ai'

export function update_is_field(
  item_type: string,
  new_value: boolean,
  salesObjects: BriefPoints[]
) {
  const newItems = salesObjects.map((item) => {
    if (item.type === item_type) {
      return { ...item, isField: new_value }
    }
    return item
  })
  return newItems
}

export const updateFildFunc: FunctionDeclaration = {
  name: 'updateIsField',
  description: `Responsible for marking the progression of data collection by updating the 'isField' attribute for a specified field to 'true'. This function must be executed immediately after the user submits valid information for either the customer type, company size, or sales approach. It is critical to invoke this function selectively and only in direct response to the acquisition of these specific data points. It must not be called with unrelated input or used to transition to the profile creation phase.`,
  parameters: {
    type: FunctionDeclarationSchemaType.OBJECT,
    properties: {
      item_type: {
        type: FunctionDeclarationSchemaType.STRING,
        enum: ['customer', 'company_size', 'sales_approach'],
        description: `Specifies which field's 'isField' attribute is to be updated, correlating to the type of information provided by the user. The valid fields are 'customer' for updating customer type, 'company_size' for the size of the company they are aiming to engage with (is very important), and 'sales_approach' for the sales approach (is very important). When set to 'true', it confirms the information has been provided and recorded.`
      },
      new_value: {
        type: FunctionDeclarationSchemaType.BOOLEAN,
        description:
          "The new status for the 'isField' attribute, which must be set to 'true' to reflect the successful acquisition and recognition of the relevant field data by the chatbot."
      }
    },
    required: ['item_type', 'new_value']
  }
}

export const functionsTools: Tool = {
  functionDeclarations: [updateFildFunc]
}
