## Overview

```url.js``` is a simple util to set url parameters from object and get url parameters as object


## Expamples

```javascript
var url = new Url("http://localhost:8000#hash")

url.data = {
    profile: 1,
    id: [42, 13, 7],
    name: "Jane",
    tag: ["wow", "such", "test"],
}

url.toString()
"http://localhost:8000?profile=1&id=42&id=13&id=7&name=Jane&tag=wow&tag=such&tag=test#hash"

url.data.id = [1, 2, 3, 4, 5]
url.data.name = "John"

url.toString()
"http://localhost:8000?profile=1&name=John&id=1&id=2&id=3&id=4&id=5&tag=wow&tag=such&tag=test#hash"

url.data = null
url.toString()
"http://localhost:8000#hash"

url = new Url("http://localhost:8000?profile=1&name=John&id=1&id=2&id=3&id=4&id=5&tag=wow&tag=such&tag=test#hash")

url.data
{
    profile: 1,
    name: "John",
    id: [1, 2, 3, 4, 5],
    tag: ["wow", "such", "test"],
}
```


### Methods
<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Description</th>
            <th>Example</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>toString</td>
            <td>get url with parameters applied</td>
            <td>
                <pre lang="javascript"><code>
var url = new Url("http://localhost:8000#hash")
url.data.id = [1, 2, 3]
url.toString()
"http://localhost:8000?id=1&id=2&id=3#hash"</code></pre>
            </td>
        </tr>
        <tr>
            <td>getParams</td>
            <td>Get parameters from url</td>
            <td>
                <pre lang="javascript"><code>
Url.getParams("http://localhost:8000?id=1&id=2&id=3#hash")
{
    id: [1, 2, 3],
}
</code></pre>
            </td>
        </tr>
        <tr>
            <td>setParams</td>
            <td>Set paremeters from object</td>
            <td>
                <pre lang="javascript"><code>
Url.setParams("http://localhost:8000#hash", {
    id: [1, 2, 3]
})
"http://localhost:8000?id=1&id=2&id=3#hash"</code></pre>
            </td>
        </tr>
    <tbody>
</table>
