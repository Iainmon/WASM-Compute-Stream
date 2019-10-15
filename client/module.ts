export default async function getModule() {
    return fetch('./build/optimized.wasm')
    .then(response => response.arrayBuffer())
    .then(buffer => WebAssembly.instantiate(buffer, {
        env: {
            abort: function () { }
        }
    }));
}