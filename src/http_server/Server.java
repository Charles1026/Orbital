package orbital.http_server;

import orbital.http_server.database.DatabaseConnector;
import orbital.http_server.database.user_management.LoginConnector;
import orbital.http_server.handlers.*;

// import java.io.IOException;
// import java.io.OutputStream;
import java.net.InetSocketAddress;

import com.sun.net.httpserver.HttpServer;

public class Server {

    public static boolean startServer(String url, int port) {
        try {
            HttpServer server = HttpServer.create(new InetSocketAddress(url, port), 0);
            server.createContext("/", new HomeHandler()); // Assigns a handler to the base website path
            server.createContext("/login", new LoginHandler()); // Assigns a handler to the base website path
            server.createContext("/register", new RegisterHandler()); // Assigns a handler to the base website path
            server.setExecutor(null); // Uses the default executor for now
            server.start();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public static void main(String[] args) {
        if (startServer("localhost", 8080)) {
            System.out.println("Server Started");
        } else {
            System.out.println("Error Server not Started");
            return;
        }
        System.out.println("Server Closed");
    }
}