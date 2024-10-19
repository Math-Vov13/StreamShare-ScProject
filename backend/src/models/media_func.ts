import { Contents, Content_DB_Type} from "./fake-db";



export async function get_content_by_id(content_id: number) {
    return Contents.find((content) => content.id === content_id);
}

export async function search_trends() {
    return Contents.slice(0, 10);
}

export async function search_content(fulfil_name: string = "", genres: Array<string> = [], tags: Array<string> = []) {
    let results : Array<Content_DB_Type> = Array(); // Liste contenant les contenus proposés par la BDD
    console.log(fulfil_name)
    console.log(genres)
    console.log(tags)

    // Meilleures Correspondances !
    results.push(...Contents.filter(raw => 
        raw.name.startsWith(fulfil_name) && 
        genres.every(element => raw.genres.includes(element)) && 
        tags.every(element => raw.tags.includes(element))
    ));
    // console.log(results.length)

    // // Classiques
    // /// (par nom)
    // results.push(...Contents.filter( raw => {
    //     raw.name.startsWith(fulfil_name) && ! results.includes(raw)
    // }));
    // console.log(results.length)

    // /// (par genres)
    // results.push(...Contents.filter( raw => {
    //     genres.every(element => raw.genres.includes(element)) && ! results.includes(raw)
    // }));
    // console.log(results.length)

    // /// (par tags)
    // results.push(...Contents.filter( raw => {
    //     tags.every(element => raw.tags.includes(element)) && ! results.includes(raw)
    // }));
    // console.log(results.length)

    return results;
}