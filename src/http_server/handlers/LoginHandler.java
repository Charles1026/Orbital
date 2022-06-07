package orbital.http_server.handlers;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import orbital.http_server.database.user_management.LoginConnector;

public class LoginHandler extends Handler {
    @Override
    public void handle(HttpExchange httpExchange) throws IOException {
      System.out.println("Incoming Request to Login");
      if ("GET".equals(httpExchange.getRequestMethod())) {
          handleGet(httpExchange, "../../frontEnd/login.html");
      } else if ("POST".equals(httpExchange.getRequestMethod())) {
          handlePost(httpExchange);
      }
    }

    @Override
    protected void handlePost(HttpExchange httpExchange) {
        String strBody = body2String(httpExchange);
        Map<String, String> httpBody = string2Map(strBody);

        boolean response = login(httpBody.get("uname"), httpBody.get("pword"));

        try {
            httpExchange.sendResponseHeaders(200, response.length());
            OutputStream os = httpExchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private boolean login(String user, String pass) {
        LoginConnector con = new LoginConnector();
        con.connectToDB("test", "users", "test","12345678");
        return con.verifyPass(user, pass);
    }
}
