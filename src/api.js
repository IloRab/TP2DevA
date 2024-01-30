import crypto from 'node: crypto'
import fetch from "node-fetch";

/**
 * Récupère les données de l'endpoint en utilisant les identifiants
 * particuliers developer.marvels.com
 * @param url l'end-point
 * @return {Promise<json>}
 */
export const getData = async (url) => {
    const publicKey = "744082de314eee9f7763f53b14c8c14c";
    const privateKey = "9e0f38824a227da0b28f447c332c6f2abea8a49c";

    const ts =new Date().toISOString();
    const hash = getHash(publicKey,privateKey,ts)

    url += "?apikey="+publicKey+"&ts="+ts+"&hash="+hash;

    return await (await fetch(url)).json();
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
