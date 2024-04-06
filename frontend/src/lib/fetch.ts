const customFetch = () => {};

const getFetch = async (input: string, tag: string) => {

  return await fetch(`${process.env.API_URL}${input}`, {
    method: "GET",
    next: { tags: [tag] },
  }).then((res) => res.json());
};

const postFetch = async (input: string, tag: string, body: any) => {
  return await fetch(`${process.env.API_URL}${input}`, {
    method: "post",
    body: JSON.stringify(body),
    next: { tags: [tag] },
  }).then((res) => res.json());
};

customFetch.get = getFetch;
customFetch.post = postFetch;

export default customFetch;
