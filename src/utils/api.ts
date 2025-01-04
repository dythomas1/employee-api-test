export interface HttpResponse {
  data: any;
  status: number;
}

export const doGet = async (url: string, params: Record<string, any> = {}): Promise<HttpResponse> => {
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;
  
  const response = await fetch(fullUrl);
  const data = await response.json();
  return {
    data,
    status: response.status
  };
};
