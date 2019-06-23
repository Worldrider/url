function assertEqual(a, b) {
    if (JSON.stringify(a) != JSON.stringify(b)) {
        // console.error(`${a} is not equal ${b}`)
        throw new Error(`${a} is not equal ${b}`)
    }
}

var url = new Url("http://localhost:8000#hash")

url.data = {
    profile: 1,
    group: [42, 13, 7],
    name: "Jane",
    tag: ["wow", "such", "test"],
}

assertEqual(url.toString(), "http://localhost:8000?profile=1&group=42&group=13&group=7&name=Jane&tag=wow&tag=such&tag=test#hash")

url.data.group = [1, 2, 3, 4, 5]
url.data.name = "John"

assertEqual(url.toString(), "http://localhost:8000?profile=1&name=John&group=1&group=2&group=3&group=4&group=5&tag=wow&tag=such&tag=test#hash")

url.data = null
assertEqual(url.toString(), "http://localhost:8000#hash")

url = new Url("http://localhost:8000?profile=1&name=John&group=1&group=2&group=3&group=4&group=5&tag=wow&tag=such&tag=test#hash")

assertEqual(url.data, {
    profile: 1,
    name: "John",
    group: [1, 2, 3, 4, 5],
    tag: ["wow", "such", "test"],
})
