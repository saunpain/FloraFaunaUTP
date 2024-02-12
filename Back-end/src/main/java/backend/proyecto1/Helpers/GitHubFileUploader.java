package backend.proyecto1.Helpers;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.util.Base64;

public class GitHubFileUploader {

    public static void uploadFileToGitHub(String owner, String repo, String filePath, File file, String token) throws Exception {
        String apiUrl = String.format("https://api.github.com/repos/%s/%s/contents/%s", owner, repo, filePath);

        URI uri = new URI(apiUrl);
        URL url = uri.toURL();
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        connection.setRequestMethod("POST");  // Cambiar a POST
        connection.setRequestProperty("Authorization", "Bearer " + token);
        connection.setRequestProperty("Content-Type", "application/vnd.github.v3+json");  // Cambiar el tipo de contenido

        // Asegurarse de incluir el encabezado Accept
        connection.setRequestProperty("Accept", "application/vnd.github.v3+json");

        connection.setDoOutput(true);

        String base64Content = Base64.getEncoder().encodeToString(loadFileAsBytesArray(file));

        String content = String.format("{\"message\":\"Upload file\",\"content\":\"%s\"}", base64Content);

        try (DataOutputStream wr = new DataOutputStream(connection.getOutputStream())) {
            wr.writeBytes(content);
            wr.flush();
        }

        int responseCode = connection.getResponseCode();

        if (responseCode == HttpURLConnection.HTTP_CREATED) {
            System.out.println("Archivo subido exitosamente a GitHub.");
        } else {
            System.out.println("Error al subir el archivo. Código de respuesta: " + responseCode);
            try (BufferedReader in = new BufferedReader(new InputStreamReader(connection.getErrorStream()))) {
                String inputLine;
                StringBuilder response = new StringBuilder();
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                System.out.println(response.toString());
            }
        }
    }

    private static byte[] loadFileAsBytesArray(File file) throws Exception {
        int length = (int) file.length();
        byte[] bytes = new byte[length];
        try (FileInputStream fis = new FileInputStream(file)) {
            if (fis.read(bytes) == -1) {
                throw new Exception("Error al leer el archivo como array de bytes.");
            }
        }
        return bytes;
    }
}
