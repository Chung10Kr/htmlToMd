

export const TARGET_DIR = "/Users/crlee/dev/contribution/egovframe-docs";
export const TOKEN = "";
export const UP_STREAM_REPO_OWNER = "eGovFramework";
export const UP_STREAM_REPO_NAME = "egovframe-docs";
export const UP_BRANCH_OWNER = "contribution";
export const REPO_OWNER = "Chung10Kr";

export const SAVE_DIR = "foundation-layer-core";
export const SPLIT_STR = "ptl";
export const HTML_URL = "https://www.egovframe.go.kr/wiki/doku.php?id=egovframework:rte4.2:ptl:spel"

function setBranch(HTML_URL){
    let arr = HTML_URL.split( SPLIT_STR )
    arr = arr[1].split(":").reverse().filter(x=>x)
    if(arr.length==1){
        return `${arr[0].replaceAll("_","-")}`
    }
    return `${arr[1].replaceAll("_","-")}-${arr[0]}`
}

export const BRANCH_NAME =  setBranch( HTML_URL );

