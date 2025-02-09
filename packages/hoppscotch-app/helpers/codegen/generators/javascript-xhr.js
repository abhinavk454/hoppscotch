import { isJSONContentType } from "~/helpers/utils/contenttypes"

export const JavascriptXhrCodegen = {
  id: "js-xhr",
  name: "JavaScript XHR",
  language: "javascript",
  generator: ({
    auth,
    httpUser,
    httpPassword,
    method,
    url,
    pathName,
    queryString,
    bearerToken,
    headers,
    rawInput,
    rawParams,
    rawRequestBody,
    contentType,
  }) => {
    const requestString = []
    requestString.push("const xhr = new XMLHttpRequest()")
    requestString.push(`xhr.addEventListener("readystatechange", function() {`)
    requestString.push(`  if(this.readyState === 4) {`)
    requestString.push(`      console.log(this.responseText)\n  }\n})`)

    const user = auth === "Basic Auth" ? `'${httpUser}'` : null
    const password = auth === "Basic Auth" ? `'${httpPassword}'` : null
    requestString.push(
      `xhr.open('${method}', '${url}${pathName}?${queryString}', true, ${user}, ${password})`
    )
    if (auth === "Bearer Token" || auth === "OAuth 2.0") {
      requestString.push(
        `xhr.setRequestHeader('Authorization', 'Bearer ${bearerToken}')`
      )
    }
    if (headers) {
      headers.forEach(({ key, value }) => {
        if (key)
          requestString.push(`xhr.setRequestHeader('${key}', '${value}')`)
      })
    }
    if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
      let requestBody = rawInput ? rawParams : rawRequestBody
      if (contentType && requestBody) {
        if (isJSONContentType(contentType)) {
          requestBody = `JSON.stringify(${requestBody})`
        } else if (contentType.includes("x-www-form-urlencoded")) {
          requestBody = `"${requestBody}"`
        }
      }
      requestBody = requestBody || ""
      requestString.push(`xhr.send(${requestBody})`)
    } else {
      requestString.push("xhr.send()")
    }
    return requestString.join("\n")
  },
}
