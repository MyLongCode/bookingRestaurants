const customFetch = () => {};

const getFetch = async (input: string, tag: string, cache?: RequestCache) => {
  return await fetch(`${process.env.API_URL}${input}`, {
    method: "get",
    next: { tags: [tag] },
    cache: cache,
  }).then((res) => res.json());
};

const postFetch = async (input: string, tag: string, body: any) => {
  return await fetch(`${process.env.API_URL}${input}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    next: { tags: [tag] },
  }).then((res) => res.json());
};

const patchFetch = async (input: string, tag: string, body: any) => {
  return await fetch(`${process.env.API_URL}${input}`, {
    method: "patch",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    next: { tags: [tag] },
  }).then((res) => res.json());
};

customFetch.get = getFetch;
customFetch.post = postFetch;
customFetch.patch = patchFetch;

export default customFetch;
