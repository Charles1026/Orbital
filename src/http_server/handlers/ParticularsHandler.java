package orbital.http_server.handlers;

import com.sun.net.httpserver.HttpExchange;

public class ParticularsHandler extends Handler {

    @Override
    public void handle(HttpExchange httpExchange) {
        System.out.println("Incoming Request to Access Personal Particulars");
        if ("GET".equals(httpExchange.getRequestMethod())) {
            handleGet(httpExchange, "frontEnd/particulars.html");
        } else if ("POST".equals(httpExchange.getRequestMethod())) {
            handlePost(httpExchange);
        }
    }

    // Does nothing.
    @Override
    protected void handlePost(HttpExchange httpExchange) {}
}