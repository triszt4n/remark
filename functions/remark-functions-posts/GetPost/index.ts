import { AzureFunction, Context, HttpRequest } from '@azure/functions'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const id = context.bindingData['id']

  context.res = {
    status: 200,
    body: `This is the ID: ${id}, typeof: ${typeof id}.`
  }
}

export default httpTrigger
