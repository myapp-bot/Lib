LIBERTÉ — COMPILATION ANDROID ET GITHUB

Cette archive est le projet web + Capacitor de départ. Elle ne contient pas encore un APK compilé.

A. COMPILATION AVEC GITHUB (sans installer Android Studio sur le PC)
1. Crée un dépôt GitHub vide.
2. Décompresse cette archive et envoie TOUS les fichiers qu’elle contient à la racine du dépôt. Il faut notamment voir package.json, capacitor.config.ts, www/ et .github/workflows/build-apk.yml à la racine.
3. Dans GitHub, ouvre l’onglet Actions et active les workflows si GitHub le demande.
4. Le workflow « Construire APK Android » démarre à chaque push sur main/master. Tu peux aussi le lancer dans Actions > Construire APK Android > Run workflow.
5. À la fin, ouvre l’exécution réussie, va dans Artifacts et télécharge liberte-apk-debug.
6. Décompresse le fichier téléchargé : app-debug.apk est l’APK de test. Transfère-le sur ton Android et autorise l’installation de cette source si Android le demande.

B. COMPILATION AVEC ANDROID STUDIO SOUS WINDOWS
Prérequis : installer Node.js LTS, Android Studio et le SDK Android.
1. Décompresse le projet dans un dossier simple, par exemple C:\LibertéAndroid.
2. Ouvre un terminal (PowerShell) dans le dossier qui contient package.json.
3. Exécute, une commande à la fois :
   npm install
   npx cap add android
   npx cap sync android
   npx cap open android
4. Android Studio s’ouvre. Attends la fin de la synchronisation Gradle et accepte l’installation des composants SDK demandés.
5. Pour créer l’APK : Build > Build Bundle(s) / APK(s) > Build APK(s).
6. En cas de succès, Android Studio indique un lien « locate ». Le fichier se trouve généralement dans android/app/build/outputs/apk/debug/app-debug.apk.

POUR METTRE À JOUR LE CONTENU WEB PLUS TARD
- Remplace les fichiers concernés dans www/.
- Puis exécute npx cap sync android avant de recompiler.

NOTES
- JavaScript/PWA : les fichiers sont dans www/.
- L’APK Debug est destiné aux tests. Pour publier sur Play Store, il faudra préparer une clé de signature et compiler un AAB signé.
- La compilation n’a pas été exécutée dans l’environnement qui a créé cette archive ; le résultat final doit être confirmé par GitHub Actions ou Android Studio.
- Le workflow installe les dépendances depuis package.json ; aucun package-lock.json n’est fourni.
- Les données locales du navigateur et celles de l’APK peuvent être stockées séparément. Exporte une sauvegarde avant tout changement de version.
