import { Request, Response, Router } from "express";
import { validate_content_id } from "../middlewares/routes/validate_content_id";
import { validate_user_token } from "../middlewares/routes/validate_token";
import { get_content_by_id, search_content, search_trends } from "../models/content_func";
import { body_data_validation } from "../middlewares/routes/data_validation";
import { get_content_schema } from "../models/Schemas/content_schema";
import { Content_DB_Type} from "../models/fake-db";


const router = Router()



router.get("/",
    validate_user_token,
    body_data_validation(get_content_schema),
    
    async (req: Request, res: Response) => {

        // Le body de la requête est vide
        if (Object.keys(req.body).length == 0) {
            res.status(200).json( {type: "media/Trends", response: await search_trends()} );
            return; // Renvoie les trends (quand l'utilisateur se connecte sur la page d'accueil)
        }
        // Les valeurs du body de la requête sont vides
        if (!req.body.FulfilName && (req.body.Categories?.length || Array().length) == 0 && (req.body.Tags?.length || Array().length) == 0) {
            res.status(200).json( {type: "media/Trends", response: await search_trends()} );
            return; // Renvoie les trends (quand l'utilisateur efface sa recherche)
        }


        // Recherche de contenus pertinents pour l'utilisateur (en fonction de ses mots clés)
        let contents : Array<Content_DB_Type> | null = await search_content(
            req.body.FulfilName as string,
            req.body.Categories as Array<string>,
            req.body.Tags as Array<string>
        )
        if (contents.length == 0) {
            res.sendStatus(404);
            return;
        }


        // Affinage des résultats de recherche par IA avec l'API de Gemini (SCORING: en fonction des résultats de la BDD + de ses mots clés)
        // null

        res.status(200).json( {type: "media/Search", lenght: contents.length, response: contents} );
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