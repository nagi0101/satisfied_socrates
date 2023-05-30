class API {
    API_PROTOCOL = "http";
    API_DOMAIN = "13.125.255.63";
    API_PORT = 8000;

    get API_BASE_URL() {
        return `${this.API_PROTOCOL}://${this.API_DOMAIN}${this.API_PORT ? ':' + this.API_PORT : ""}`;
    }

    get = async (url) => {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    }

    post = async (url, body) => {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });
        return await response.json();
    }

    put = async (url, body) => {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });
        return await response.json();
    }

    delete = async (url) => {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response;
    }
}

class PATH {
    constructor(string) {
        this.value = string;
    }

    get POSTS() { return new PATH(this.value + "/posts") }
    get COMMENTS() { return new PATH(this.value + "/comments") }

    get url() { return this.value + '/'; }

    of = (string) => { return new PATH(this.value + '/' + string) }
}

const api = new API;
const path = new PATH(api.API_BASE_URL);

export { api, path };
