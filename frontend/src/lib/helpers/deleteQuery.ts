import { ReadonlyURLSearchParams } from "next/navigation";

const deleteQuery = (
  searchParams: ReadonlyURLSearchParams,
  queries: Array<{ key: string; value?: string }>,
) => {
  const params = new URLSearchParams(searchParams);
  for (const { key, value } of queries) {
    if (value) {
      params.delete(key, value);
    } else {
      params.delete(key);
    }
  }
  return params;
};

export default deleteQuery;
