
export default async function getJson<T>(url: string) {
  const response = await fetch(url);
  const contentType = response.headers.get("Content-Type");
  const isJson = contentType && contentType.indexOf("application/json") || response.url.endsWith(".json")
  let data = undefined;
  try {
    const promisedData =
      isJson
        ? response.json().then(x => x as T)
        : response.text();

    data = await promisedData;
  } catch (ex) {
    data = ex
  }

  const result = {
    ok: response.ok,
    status: response.status,
    data: data
  };
  return result;
}