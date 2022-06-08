package orbital.http_server.handlers;

import com.sun.net.httpserver.HttpExchange;
import orbital.http_server.database.user_management.RegisterConnector;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;

public class RegisterHandler extends Handler {
    @Override
    public void handle(HttpExchange httpExchange) throws IOException {
        System.out.println("Incoming Request to Register");
        if ("GET".equals(httpExchange.getRequestMethod())) {
            handleGet(httpExchange, "../../frontEnd/register.html");
        } else if ("POST".equals(httpExchange.getRequestMethod())) {
            handlePost(httpExchange);
        }
    }

    @Override
    protected void handlePost(HttpExchange httpExchange) {
        String strBody = body2String(httpExchange);
        Map<String, String> httpBody = string2Map(strBody);

        boolean validated = createAccount(httpBody.get("user"), httpBody.get("pwrd"));
        int httpCode = validated ? 201 : 401;

        String response = validated ? "Account Created, Please Login" : "Invalid Login Credentials";

        try {
            httpExchange.sendResponseHeaders(httpCode, response.length());
            OutputStream os = httpExchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private boolean createAccount(String user, String pass) {
        RegisterConnector con = new RegisterConnector();
        con.connectToDB("test", "users", "test","12345678");
        return con.createUser(user, pass);
    }
}
