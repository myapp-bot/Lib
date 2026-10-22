# Liberté 2.2 — Français / Malagasy

- Choix FR / MG en haut de l’écran, et Français / Malagasy dans Réglages.
- Langue mémorisée dans la sauvegarde locale et dans les exports JSON.
- Menus, messages, textes d’accompagnement, versets et ressources intégrés disponibles dans les deux langues.
- Les deux méditations longues ont une adaptation malgache explicitement indiquée ; leurs originaux français complets sont conservés.
- Les versets traduits sont des formulations de lecture, sans attribution à une édition biblique particulière.
- Les textes personnels ne sont pas traduits automatiquement. L’édition d’un contenu est enregistrée pour la langue affichée, sans écraser l’autre version.
- L’HTML fourni s’ouvre directement dans un navigateur, avec icônes intégrées. La biométrie PWA exige un contexte HTTPS compatible ; le fichier local n’offre pas cette fonction.
- La voix malgache nécessite une voix compatible installée sur l’appareil. En son absence, un message explicite s’affiche. Le texte reste consultable.
- Tests automatisés supplémentaires : bascules FR/MG répétées, langue conservée après réouverture, notes et brouillons inchangés, édition distincte par langue et absence de lecture malgache avec une voix française.
- Ces tests sont des tests DOM et de logique. Le rendu visuel sur appareil réel et les modules Android restent à valider après compilation.

# Liberté 2.1 — modifications du 21 octobre 2026

Ce dossier contient le projet source modifié, pas un nouvel APK compilé.

## Modifications
- Menu principal plus compact, avec boutons tactiles de 44 px minimum.
- Cigarettes par jour : 7, 14, 30, 90 jours ou dates personnalisées (366 jours maximum). Dates affichées, distinction entre zéro et donnée absente. Les autres indicateurs conservent leur périmètre habituel.
- Versets à méditer : ajout, modification, suppression, écoute et copie. Gestion centralisée dans Bibliothèque, catégorie Verset.
- Ressources Alcool : mêmes possibilités, catégorie Ressource Alcool. Les textes initiaux sont conservés et migrés une seule fois. Ils sont inclus dans les sauvegardes JSON.
- Suppression persistante des contenus de la bibliothèque, y compris les contenus initiaux.
- APK : lecture française via TextToSpeech Android, découpage des textes longs, pause/reprise/arrêt et messages d'erreur. Une voix française doit être installée dans les paramètres de synthèse vocale du téléphone.
- Bouton Activer biométrie : active une authentification Android par biométrie ou verrouillage du téléphone. Définir d'abord le PIN de secours de Liberté. Le PIN de Liberté et le code de verrouillage Android peuvent être différents.
- PWA HTTPS : création d'un identifiant WebAuthn local et vérification des signatures, avec PIN de secours. La compatibilité dépend du navigateur et de l'appareil. Une ouverture en fichier HTML local n'offre pas cette fonction.
- Verrouillage au passage en arrière-plan si le PIN est actif. Ces fonctions verrouillent l'interface ; elles ne chiffrent pas les données stockées ou exportées.

## Obtenir le nouvel APK avec GitHub
1. Extraire cette archive.
2. Remplacer les fichiers du dépôt par le contenu du dossier Lib-main, à la racine du dépôt. Inclure les dossiers www, native, scripts et .github. Ne pas simplement déposer le ZIP dans le dépôt.
3. Le workflow fourni reconstruit l'application lors du push sur main/master. Il peut aussi être lancé depuis Actions → Construire APK Android → Run workflow.
4. Une fois le workflow vert, télécharger l'artefact liberte-apk-debug puis extraire app-debug.apk.

## Préserver tes données
Exporter une sauvegarde JSON depuis l'application actuellement installée avant toute mise à jour.
Une mise à jour directe conserve les données si l'identifiant ET la signature restent les mêmes. L'ancienne clé de signature n'est pas contenue dans l'APK fourni. Les builds debug GitHub peuvent avoir une autre signature ; si Android refuse la mise à jour, ne désinstaller qu'après avoir vérifié ta sauvegarde, puis la restaurer dans la nouvelle application. La biométrie devra être réactivée après restauration.

## Vérification effectuée
- Tests existants : export Android, annulation, erreur, clics concurrents, export navigateur et syntaxe JavaScript.
- Tests DOM automatisés : démarrage, périodes et dates invalides, ajout/modification/suppression de versets, suppression des ressources Alcool, échappement du HTML, persistance des suppressions et verrouillage/déverrouillage par PIN.
- Génération du projet Android et synchronisation Capacitor réussies ; enregistrement des plugins, permissions et dépendance biométrique vérifiés.

## À vérifier après compilation
La compilation Android, le rendu sur téléphone et les fonctions matérielles n'ont pas été validés ici. Tester : lecture complète d'un texte, pause/reprise/arrêt, activation biométrique, annulation, code Android, PIN Liberté et retour après passage en arrière-plan. La validation WebAuthn sur un appareil réel reste également à effectuer.
