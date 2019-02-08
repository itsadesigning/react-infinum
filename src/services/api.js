export function _get(model) {
    return fetch(`https://api.infinum.academy/api/${model}`)
        .then((res) => res.json())
        .then((res) => res.data);
}

export function _post(model, data) {
    return fetch(`https://api.infinum.academy/api/${model}`, data)
        .then((res) => res.json())
        .then((res) => res.data)
}

export function _delete(model, data) {
    return fetch(`https://api.infinum.academy/api/${model}`, data)
}
