import { ReadonlyURLSearchParams } from "next/navigation";

const deleteQuery = (
  searchParams: ReadonlyURLSearchParams,
  queries: Array<{ key: string; value?: string }>,
) => {
  const params = new URLSearchParams(searchParams);
  for (const key in queries) {
    params.delete(key, queries?.[key].value);
  }
  return params;
};

export default deleteQuery;
