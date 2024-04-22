# API Fetcher

Ce module fournit une classe pour appeler des API à partir d'un serveur Express.

## Installation

```bash

npm install https://github.com/williambastard/private_modules.git#main

```

### Utilisation
Pour utiliser cette classe, importez-la dans votre projet comme suit :

```javascript
const { Response, Request } = require("express");
const Call = require("private_modules");

// Créer une instance de la classe Call
const apiCaller = new Call(request, response, "target", "endpoint", msport);

// Appeler l'API
apiCaller.fetch()
    .then(() => {
        // Gérer la réponse ici
    })
    .catch((error) => {
        // Gérer les erreurs ici
    });
```

# Documentation
## Méthodes

constructor(request, response, mstarget, msendpoint, msport) : Constructeur de la classe Call.
request: Request: L'objet Request d'Express.
response: Response: L'objet Response d'Express.
mstarget: string: La cible de l'API.
msendpoint: string: Le point de terminaison de l'API.
msport: number: Le port de l'API.

setGatewayIp(gatewayIp: string): Call
Définit l'adresse IP de la passerelle.

gatewayIp: string: L'adresse IP de la passerelle.
fetch(): Promise<Call>
Effectue l'appel à l'API.

setStatus(status: number): void
Définit le statut de la réponse.

status: number: Le statut HTTP de la réponse.
setIsOK(isOK: boolean): void
Définit si la réponse est OK ou non.

isOK: boolean: true si la réponse est OK, sinon false.
setSession(session: any | false): void
Définit la session de l'utilisateur.

session: any | false: La session de l'utilisateur.
setcallHeaders(callHeaders: any): void
Définit les en-têtes de la réponse.

callHeaders: any: Les en-têtes de la réponse.
setcallResponse(callResponse: any): void
Définit la réponse de l'appel.

callResponse: any: La réponse de l'appel.
setData(data: any | false): void
Définit les données de la réponse.

data: any | false: Les données de la réponse.
setHeaderKey(headerKey: string, headerValue: any): void
Ajoute un en-tête personnalisé.

headerKey: string: Le nom de l'en-tête.
headerValue: any: La valeur de l'en-tête.
getHeaderKey(headerKey: string): string | undefined
Récupère la valeur de l'en-tête.

headerKey: string: 
Le nom de l'en-tête.

getToken(): string
Récupère le jeton d'authentification de la requête.

getOrigin(): string
Récupère l'origine de la requête.

getFetchOptions(): RequestInit
Récupère les options de la requête fetch.

getTarget(): string
Récupère la cible de l'appel.

formatKeyName(headerKey: string): string
Formate le nom de l'en-tête.

headerKey: string: Le nom de l'en-tête.
initFetchOptions(): void
Initialise les options de la requête fetch.

initHeader(mstarget: string, msendpoint: string, msport: number): void
Initialise les en-têtes de la requête.

mstarget: string: La cible de l'API.
msendpoint: string: Le point de terminaison de l'API.
msport: number: Le port de l'API.
