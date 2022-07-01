import axios, { AxiosResponse } from "axios";

export class Reddit {

  private static BASE_REDDIT_URL: string = 'https://www.reddit.com/'

  static async getComments(identifier: string): Promise<any> {
    const response: AxiosResponse<any> = await axios.get(
      `${Reddit.BASE_REDDIT_URL}/user/${identifier}/comments.json`,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        }
      }
    )
    if (response.statusText === 'OK') {
      return response.data;
    } else {
      throw new Error('Failed to load comments data from reddit')
    }
  }

  static async getSubmissions(identifier: string): Promise<any> {
    const response: AxiosResponse<any> = await axios.get(
      `${Reddit.BASE_REDDIT_URL}/user/${identifier}/posts.json`,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        }
      }
    )
    if (response.statusText === 'OK') {
      return response.data;
    } else {
      throw new Error('Failed to load posts data from reddit')
    }
  }
}