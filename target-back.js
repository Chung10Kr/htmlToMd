

export const TARGET_DIR = "";
export const TOKEN = "";
export const UP_STREAM_REPO_OWNER = "";
export const UP_STREAM_REPO_NAME = "";
export const REPO_OWNER = "";

export const SAVE_DIR = "";
export const HTML_URL = ""

function setBranch(HTML_URL){
    let arr = HTML_URL.split("fdl")
    arr = arr[1].split(":").reverse().filter(x=>x)
    if(arr.length==1){
        return `${arr[0].replaceAll("_","-")}`
    }
    return `${arr[1].replaceAll("_","-")}-${arr[0]}`
}

export const BRANCH_NAME =  setBranch( HTML_URL );

