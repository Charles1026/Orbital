package orbital;

import orbital.DatabaseConnector;

// import java.io.IOException;
// import java.io.OutputStream;
import java.io.*;
import java.net.InetSocketAddress;
import java.util.HashMap;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class Server {
    
    class BaseHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange httpExchange) throws IOException {

            System.out.println("Incoming Request");
            InputStreamReader isr =  new InputStreamReader(httpExchange.getRequestBody(),"utf-8");
            BufferedReader br = new BufferedReader(isr);

            int b;
            StringBuilder buf = new StringBuilder(512);
            while ((b = br.read()) != -1) {
                buf.append((char) b);
            }
            String str = buf.toString();
            String[] splitStr = str.split("&");
            HashMap<String, String> body = new HashMap<String, String>();

            for (String elem : splitStr) {
                String[] secondSplit = elem.split("=");
                body.put(secondSplit[0], secondSplit[1]);
            }

            boolean userExists = db.verifyPass(body.get("user"), body.get("pwrd"));

            System.out.println(userExists);
            
            String response = "Testing 123";
            httpExchange.sendResponseHeaders(200, response.length());
            OutputStream os = httpExchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }

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