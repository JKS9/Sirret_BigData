# Big Data

Optimisation d'insertion de donnée en BDD avec Nodejs et Mongoose

## Installation

- clone le projet avec github

```bash
git clone https://github.com/JKS9/Sirret_BigData.git
```
- install node_modules
```bash
npm install
```

- install PM2 en global
```bash
sudo npm i -g pm2
```

- ouvrir votre terminal, afficher le moniteur de pm2 pour vérifier son install
```bash
pm2 monit
```
## Usage

### 1 - Etape : 

Vous devez télécharger le fichier csv “Sirene : Fichier StockEtablissement” à cette adresse :

```bash
https://www.data.gouv.fr/fr/datasets/base-sirene-des-entreprises-et-de-leurs-etablissements-siren-siret/
```
Et placer le à la racine du projet et renommer le en :

```bash
dataMain.csv
```
commandes : 
```bash
npm run import
```
cela va parce le fichier en plusieurs petit fichier .csv (280 000 lignes par fichier).
- avant
```bash
dataMain.csv
```
- après
```bash
1.csv
2.csv
3.csv
...
```
---
### 2 - Etape : 
Lancer l'ajout en base de données et le lancement des process Pm2 pour optimisé l'insert.
```bash
npm start
```

Pm2 va lancer 4 process simultanément sur votre machine pour faire des ajouts en base rapidement.