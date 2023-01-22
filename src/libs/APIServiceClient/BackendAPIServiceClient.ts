import BaseAPIServiceClient from './BaseAPIServiceClient'

const baseURL = `${process.env['NEXT_PUBLIC_BACKEND_API_URL']}/api/v1`

class BackendAPIServiceClient extends BaseAPIServiceClient {
  constructor(token: string) {
    super({
      baseURL,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }
}

const getBackendAPIServiceClient = (token: string) => new BackendAPIServiceClient(token)
export default getBackendAPIServiceClient
