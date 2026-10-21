package mg.libertelibre.app;

import android.app.Activity;
import android.content.Intent;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

@CapacitorPlugin(name = "DataExport")
public class DataExportPlugin extends Plugin {
    private boolean saving = false;

    @PluginMethod
    public void save(PluginCall call) {
        if (saving) { call.reject("Un export est déjà en cours."); return; }
        if (call.getString("content") == null || call.getString("name") == null) {
            call.reject("Contenu ou nom de fichier manquant."); return;
        }
        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType(call.getString("mimeType", "application/json"));
        intent.putExtra(Intent.EXTRA_TITLE, call.getString("name"));
        saving = true;
        try { startActivityForResult(call, intent, "fileSelected"); }
        catch (Exception e) { saving = false; call.reject("Impossible d’ouvrir le sélecteur de fichiers.", e); }
    }

    @ActivityCallback
    private void fileSelected(PluginCall call, ActivityResult result) {
        saving = false;
        if (call == null) return;
        if (result.getResultCode() != Activity.RESULT_OK) {
            JSObject response = new JSObject();
            response.put("cancelled", true); call.resolve(response); return;
        }
        Intent data = result.getData();
        if (data == null || data.getData() == null) { call.reject("Aucun fichier sélectionné."); return; }
        try (OutputStream output = getContext().getContentResolver().openOutputStream(data.getData(), "wt")) {
            if (output == null) throw new java.io.IOException("Destination inaccessible");
            output.write(call.getString("content", "").getBytes(StandardCharsets.UTF_8));
            output.flush();
        } catch (Exception e) { call.reject("Enregistrement impossible. Vérifie l’espace disponible et la destination.", e); return; }
        JSObject response = new JSObject();
        response.put("cancelled", false); call.resolve(response);
    }
}
