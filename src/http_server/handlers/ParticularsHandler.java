package orbital.http_server.handlers;

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

    // Does nothing. Can be changed in the future if you want to add in an edit function on this handler
    @Override
    protected void handlePost(httpExchange) {
        return;
    }
}