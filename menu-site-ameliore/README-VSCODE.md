# Prince Gâteaux — Projet VS Code

Ce dossier contient le code source du site amélioré de Prince Gâteaux.

## Ouvrir le projet

Décompressez l’archive, puis ouvrez le dossier `menu-site-ameliore` dans VS Code avec **File > Open Folder**.

## Installer les dépendances

Dans le terminal intégré de VS Code, exécutez :

```bash
pnpm install
```

Si `pnpm` n’est pas installé, utilisez :

```bash
npm install -g pnpm
```

## Lancer le site en développement

```bash
pnpm dev
```

Ouvrez ensuite l’adresse affichée dans le terminal, généralement `http://localhost:3000`.

## Vérifier le projet

Pour vérifier le typage et compiler le site :

```bash
pnpm check
pnpm build
```

## Fichiers principaux

| Fichier | Rôle |
| --- | --- |
| `client/src/pages/Home.tsx` | Contenu et interactions de la page principale |
| `client/src/index.css` | Palette, typographies, mise en page et responsive design |
| `client/index.html` | Titre, langue et chargement des polices |
| `ideas.md` | Direction artistique retenue |
| `package.json` | Scripts et dépendances du projet |

Les photos du Menu et les visuels de marque sont référencés par leurs URL de stockage dans `Home.tsx`. Une connexion Internet est donc nécessaire pour afficher les images dans l’environnement local.
