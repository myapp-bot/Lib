import { existsSync, readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const java = resolve(root, 'android/app/src/main/java/mg/libertelibre/app');
const activity = resolve(java, 'MainActivity.java');
if (!existsSync(activity)) throw new Error('Exécute npx cap add android avant npm run prepare:android.');
copyFileSync(resolve(root, 'native/android/DataExportPlugin.java'), resolve(java, 'DataExportPlugin.java'));
let source = readFileSync(activity, 'utf8');
if (!source.includes('registerPlugin(DataExportPlugin.class)')) {
  if (source.includes('void onCreate(')) {
    if (!source.includes('super.onCreate(savedInstanceState);')) throw new Error('MainActivity personnalisée : intégrer DataExport manuellement.');
    source = source.replace('super.onCreate(savedInstanceState);', 'registerPlugin(DataExportPlugin.class);\n        super.onCreate(savedInstanceState);');
  } else {
    source = source.replace(/extends BridgeActivity\s*\{/, `extends BridgeActivity {
    @Override
    public void onCreate(android.os.Bundle savedInstanceState) {
        registerPlugin(DataExportPlugin.class);
        super.onCreate(savedInstanceState);
    }
`);
  }
  if (!source.includes('registerPlugin(DataExportPlugin.class)')) throw new Error('MainActivity non reconnue.');
  writeFileSync(activity, source);
}
const res = resolve(root, 'android/app/src/main/res');
for (const density of ['mdpi','hdpi','xhdpi','xxhdpi','xxxhdpi']) {
  const dir = resolve(res, 'mipmap-' + density); mkdirSync(dir, {recursive:true});
  for (const name of ['ic_launcher','ic_launcher_round']) copyFileSync(resolve(root,'www/icon-512.png'), resolve(dir,name+'.png'));
}
mkdirSync(resolve(res,'drawable'),{recursive:true});
copyFileSync(resolve(root,'www/icon-512.png'),resolve(res,'drawable/liberte_icon.png'));
writeFileSync(resolve(res,'drawable/liberte_foreground.xml'), `<?xml version="1.0" encoding="utf-8"?>
<inset xmlns:android="http://schemas.android.com/apk/res/android" android:inset="18%"><bitmap android:src="@drawable/liberte_icon" android:gravity="fill" /></inset>`);
mkdirSync(resolve(res,'values'),{recursive:true});
writeFileSync(resolve(res,'values/liberte_colors.xml'), '<resources><color name="liberte_icon_background">#173f35</color></resources>');
mkdirSync(resolve(res,'mipmap-anydpi-v26'),{recursive:true});
for (const name of ['ic_launcher','ic_launcher_round']) writeFileSync(resolve(res,'mipmap-anydpi-v26',name+'.xml'), `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android"><background android:drawable="@color/liberte_icon_background"/><foreground android:drawable="@drawable/liberte_foreground"/></adaptive-icon>`);
console.log('Export Android et icônes Liberté intégrés.');
