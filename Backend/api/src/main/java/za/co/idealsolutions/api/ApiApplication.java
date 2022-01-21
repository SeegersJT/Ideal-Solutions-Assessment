package za.co.idealsolutions.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApiApplication {

	public static void main(String[] args) {
		try {
			SpringApplication.run(ApiApplication.class, args);
		} catch(Exception e) {
			// Application crash - Most likely MySQL connection failure
			// System.out.print("\033[H\033[2J");
			// System.out.flush();
			System.out.println("The application could not start. Is your MySQL instance running?");
		}
	}

}
