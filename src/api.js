import crypto from 'node:crypto'
import fetch from "node-fetch";
import "dotenv/config";

/**
 * Récupère les données de l'endpoint en utilisant les identifiants
 * particuliers developer.marvels.com
 * @param url l'end-point
 * @return {Promise<json>}
 */
export const getData = async (url) => {
    const publicKey = process.env.PUBKEY;
    const privateKey = process.env.PRIKEY;

    const ts =new Date().toISOString();
    const hash =await getHash(publicKey,privateKey,ts)

    url += "?apikey="+publicKey+"&ts="+ts+"&hash="+hash;
    const response = await (await fetch(url)).json()
    const trueresponse = [];
    response.data.results.forEach((element)=> {
            if (!element.thumbnail.path.includes("image_not_available")){
                trueresponse.push({nom : element.name, path : element.thumbnail.path+"/portrait_xlarge."+element.thumbnail.extension})
            }
        })
    //console.log(trueresponse)
    return trueresponse;
}

/**
 * Calcul la valeur md5 dans l'ordre : timestamp+privateKey+publicKey
 * cf documentation developer.marvels.com
 * @param publicKey
 * @param privateKey
 * @param timestamp
 * @return {Promise<ArrayBuffer>} en hexadecimal
 */
export const getHash = async (publicKey, privateKey, timestamp) => {
    const hash= crypto.createHash('md5').update(timestamp+privateKey+publicKey).digest("hex");
    return hash;
}

//getData("https://gateway.marvel.com:443/v1/public/characters")