
function url(path: string) {
    
    return `${window.location.protocol}//api.${window.location.host}/${path}`
}

export default { url }
