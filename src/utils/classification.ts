import { BanClassification } from "@prisma/client";

export const classifyText = (reason: string): BanClassification => {
    if (!reason) return BanClassification.OTHER;

    const text = reason.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    if ([
        "harcelement",
        "harceleur",
        "harceleuse",
        "insulte",
        "menace",
        "agression",
        "verbal",
        "attaque",
        "pourriture",
        "degage",
        "gros nul",
        "trou du cul",
        "fais chier",
        "connard",
        "harassment",
        "abuse",
        "threat",
        "attack",
        "bully",
        "verbal",
        "insult",
        "idiot",
        "loser",
        "shut up",
        "shut your mouth",
        "get lost"
    ].some(word => text.includes(word))) {
        return BanClassification.HARASSMENT;
    };

    if ([
        "spoiler",
        "spoil",
        "revele",
        "revelation",
        "fin",
        "intrigue",
        "plot",
        "fin du jeu",
        "fin du film",
        "devoile",
        "fuite",
        "information non divulguee",
        "alerte spoiler",
        "attention spoil",
        "spoiler",
        "spoil",
        "reveal",
        "leak",
        "ending",
        "plot twist",
        "plot",
        "story reveal",
        "ending reveal",
        "spoiler alert",
        "warning spoiler"
    ].some(word => text.includes(word))) {
        return BanClassification.SPOIL;

    }

    if ([
        "conseils",
        "indications",
        "guidage",
        "backseat",
        "instruction",
        "comment jouer",
        "diriger",
        "forcer a jouer",
        "imposer choix",
        "donner la solution",
        "backseat",
        "advice",
        "instructions",
        "guidance",
        "telling how to play",
        "forcing choices",
        "imposing decisions",
        "giving the solution",
        "tips",
    ].some(word => text.includes(word))) {
        return BanClassification.BACKSEAT;

    }

    if ([
        "spam",
        "flood",
        "repetition",
        "message repetitif",
        "trop de messages",
        "trop rapide",
        "liens non autorises",
        "publicite",
        "self-promotion",
        "promotion personnelle",
        "link spam",
        "bot",
        "automatisé",
        "message automatique",
        "publicite spam",
        "emote spam",
        "repetition excessive",
        "flooding",
        "commentaire abusif",
        "spam emojis",
        "mass messaging"
    ].some(word => text.includes(word))) {
        return BanClassification.SPAM;

    }

    if ([
        "homophobie",
        "homophobe",
        "insulte homophobe",
        "discrimination homosexuelle",
        "haine envers les homosexuels",
        "insultes homophobes",
        "attitude homophobe",
        "commentaire homophobe",
        "propos homophobe",
        "prejuges homophobes",
        "slur homophobe",
        "homophobia",
        "homophobic",
        "homophobic slur",
        "anti-gay",
        "anti-lgbt",
        "hate speech",
        "homosexual discrimination",
        "homophobic insults",
        "gay bashing",
        "lgbt hate",
        "lgbt discrimination",
        "pword",
        "p word",
        "p-word",
        "pd",
    ].some(word => text.includes(word))) {
        return BanClassification.HOMOPHOBIA;

    }

    if ([
        "transphobie",
        "transphobe",
        "transgenre",
        "transidentite",
        "misgenre",
        "discrimination",
        "identite de genre",
        "maugenre",
        "attaque transgenre",
        "insulte trans",
        "transphobia",
        "transphobic",
        "transgender",
        "misgendering",
        "discrimination",
        "gender identity",
        "trans slur",
        "attack transgender",
        "trans insult",
        "transophobie",
        "transophobe",
        "transophobic"
    ].some(word => text.includes(word))) {
        return BanClassification.TRANSPHOBIA;

    }

    if ([
        "racisme",
        "raciste",
        "xenophobie",
        "xenophobe",
        "discrimination",
        "ethnie",
        "origine",
        "pejoratif",
        "insulte raciale",
        "ethnique",
        "couleur de peau",
        "prejuges",
        "stereotypes",
        "race",
        "slur",
        "racial slur",
        "racism",
        "racist",
        "hate speech",
        "discrimination",
        "ethnicity",
        "ethnic slur",
        "racial insult",
        "stereotypes",
        "prejudice",
        "derogatory language",
        "skin color",
        "nword",
        "n word",
        "n-word"
    ].some(word => text.includes(word))) {
        return BanClassification.RACISM;

    }

    if ([
        "sexist",
        "misogyny",
        "misogynist",
        "patriarchy",
        "discrimination",
        "gendered",
        "sexism",
        "chauvinism",
        "objectification",
        "mansplaining",
        "inequality",
        "stereotype",
        "sexiste",
        "misogynie",
        "misogyne",
        "patriarcat",
        "discrimination",
        "genre",
        "sexisme",
        "machisme",
        "objectification",
        "inegalite",
        "stereotype",
        "inferiorite",
        "miso",
        "myso",
        "mysogynie",
        "mysogyne",
        "mysoginie",
        "mysogine",
    ].some(word => text.includes(word))) {
        return BanClassification.SEXISM;

    }

    if ([
        "pseudo",
        "nickname",
        "username",
        "identifiant",
        "handle",
        "login",
        "user",
        "utilisateur",
        "compte",
        "account",
        "alias",
        "nom",
        "name",
        "displayname",
        "appellation",
        "moniker"
    ].some(word => text.includes(word))) {
        return BanClassification.INAPPROPRIATE_NAME;

    }

    return BanClassification.OTHER;
}
