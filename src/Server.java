//package orbital;

import DatabaseConnector;

// import java.io.IOException;
// import java.io.OutputStream;
import java.io.*;
import java.net.InetSocketAddress;
import java.util.HashMap;

import javax.sql.rowset.CachedRowSet;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class Server {

    private String url;

    private int port;

    private DatabaseConnector db;

    public Server(String url, int port, DatabaseConnector db) {
        this.url = url;
        this.port = port;
        this.db = db;
    }

    public boolean startServer() {
        try {
            HttpServer server = HttpServer.create(new InetSocketAddress(url, port), 0);
            server.createContext("/", new BaseHandler()); // Assigns a handler to the base website path
            server.setExecutor(null); // Uses the default executor for now
            server.start();

            this.db.connectToDB("test", "users", "test","12345678");

            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    public static void main(String[] args) throws Exception {
        DatabaseConnector db = new DatabaseConnector();
        Server server = new Server("localhost", 80, db);
        System.out.println("Hello");
        server.startServer();
    }
}