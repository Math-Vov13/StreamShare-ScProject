import { Request, Response, Router } from "express";
import { validate_content_id } from "../middlewares/routes/validate_content_id";
import { validate_user_token } from "../middlewares/routes/validate_token";
import { get_content_by_id, search_content, search_trends } from "../models/content_func";
import { user_watched_content } from "../models/users_func";
import { body_data_validation } from "../middlewares/routes/data_validation";
import { get_content_schema, content_type, secured_content_type, semi_secured_content_type } from "../models/Schemas/content_schema";
import { user_type } from "../models/Schemas/users_schema";


const router = Router()



router.get("/",
    validate_user_token,
    // body_data_validation(get_content_schema),
    
    async (req: Request, res: Response) => {

        // Le body de la requête est vide
        const Condition1 = Object.keys(req.body).length == 0; // Renvoie les trends (quand l'utilisateur se connecte sur la page d'accueil)
        // Les valeurs du body de la requête sont vides
        const Condition2 = !req.body.fulfilname && (req.body.categories?.length || Array().length) == 0 && (req.body.tags?.length || Array().length) == 0 // Renvoie les trends (quand l'utilisateur efface sa recherche)

        if (Condition1 || Condition2) {
            const search_results = await search_trends();
            let secured_search_results : Array<secured_content_type> = Array();
            search_results?.forEach((element) => {
                secured_search_results.push(
                    {
                        id: element.id,
                        title: element.title,
                        thumbnail: element.thumbnail,
                        note: element.note
                    }
                )
            })

            res.status(200).json( {type: "media/Trends", response: secured_search_results} );
            return; // Renvoie les trends
        }


        // Recherche de contenus pertinents pour l'utilisateur (en fonction de ses mots clés)
        const contents : content_type[] | null = await search_content(
            req.body.fulfilname as string,
            req.body.categories as content_type["categories"],
            req.body.tags as content_type["tags"]
        )
        if (! contents) {
            res.sendStatus(404);
            return;
        }

        let secured_contents : Array<semi_secured_content_type> = Array();
        contents.forEach((element) => {
            secured_contents.push({
                id: element.id,
                title: element.title,
                all_audiances: element.all_audiances,
                note: element.note,
                release_date: element.release_date,
                categories: element.categories,
                tags: element.tags,
                genre: element.genre
            })
        })


        // Affinage des résultats de recherche par IA avec l'API de Gemini (SCORING: en fonction des résultats de la BDD + de ses mots clés)
        // null

        res.status(200).json( {type: "media/Search", lenght: Object.keys(contents).length, response: secured_contents} );
    }
);

router.get("/:content_id",
    validate_user_token,
    validate_content_id,

    async (req: Request, res: Response) => {
        const content_id = req.params.content_id;

        res.json( {response: await get_content_by_id(content_id)} );
    }
);

router.post("/:content_id/watch",
    validate_user_token,
    validate_content_id,

    async (req: Request, res: Response) => {
        const content_id = req.params.content_id;

        // TODO: Ajouter le watch_time
        if (await user_watched_content(req.user?.id as user_type["id"], content_id)) {
            res.sendStatus(200);
            return;
        } else {
            res.sendStatus(504);
            return;
        }
    }
);

router.delete("/:content_id",
    validate_user_token,
    validate_content_id,

    async (_: Request, res: Response) => {
        // TODO: utiliser une requête SQL directement...
        res.status(403).json( {detail: "This method is only reserved to our Internal Services!"} );
        return;
    }
);


export default router;