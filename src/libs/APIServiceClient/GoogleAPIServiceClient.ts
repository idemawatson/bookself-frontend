import BaseAPIServiceClient from './BaseAPIServiceClient'

class GoogleAPIServiceClient extends BaseAPIServiceClient {
  constructor() {
    super({
      baseURL: 'https://www.googleapis.com',
      headers: {
        'Content-type': 'application/json',
      },
    })
  }
}

export default new GoogleAPIServiceClient()
