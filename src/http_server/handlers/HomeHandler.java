package orbital.http_server.handlers;

import java.io.*;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class HomeHandler extends Handler {
    @Override
    public void handle(HttpExchange httpExchange) {
      System.out.println("Incoming Request to Index");
      if ("GET".equals(httpExchange.getRequestMethod())) {
          handleGet(httpExchange, "frontEnd/index.html");
      } else if ("POST".equals(httpExchange.getRequestMethod())) {
          handlePost(httpExchange);
      }
    }

    // Does Nothing
    @Override
    protected void handlePost(HttpExchange httpExchange){ return;}
}
