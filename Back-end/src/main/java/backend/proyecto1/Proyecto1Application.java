package backend.proyecto1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import backend.proyecto1.Helpers.GitHubFileUploader;

@SpringBootApplication
public class Proyecto1Application {

	public static void main(String[] args) {
		SpringApplication.run(Proyecto1Application.class, args);
		GitHubFileUploader obj = new GitHubFileUploader();
		obj.subirArchivoGitHub();
	}

}
