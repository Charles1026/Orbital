package orbital.http_server.handlers;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;


public abstract class Handler implements HttpHandler {

    public abstract void handle(HttpExchange httpExchange) throws IOException;

    protected void handleGet(HttpExchange httpExchange, String webpageUrl) {
        Headers header = httpExchange.getResponseHeaders();
        String line;
        StringBuilder response = new StringBuilder();
        try {
            File htmlPage = new File(webpageUrl);
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(new FileInputStream(htmlPage)));
            while ((line = bufferedReader.readLine()) != null) {
                System.out.println(line);
                response.append(line);
            }
            bufferedReader.close();

            header.add("Content-Type", "text/html");
            httpExchange.sendResponseHeaders(200, response.length());
            OutputStream os = httpExchange.getResponseBody();
            os.write(response.toString().getBytes());
            os.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    protected abstract void handlePost(HttpExchange httpExchange);

    /**
     * Converts a POST request body into a String
     * @param httpExchange POST Request
     * @return String result
     */
    protected String body2String(HttpExchange httpExchange) {
        try {
            InputStreamReader isr = new InputStreamReader(httpExchange.getRequestBody(), StandardCharsets.UTF_8);
            BufferedReader br = new BufferedReader(isr);

            int b;
            StringBuilder buf = new StringBuilder(512);
            while ((b = br.read()) != -1) {
                buf.append((char) b);
            }
            return buf.toString();
        } catch (IOException e) {
            e.printStackTrace();
            return "";
        }
    }

    /**
     * Converts a String read from POST into Map format
     * @param str Input String
     * @return Map containing POST request body
     */
    protected Map<String, String> string2Map(String str) {
        String[] splitStr = str.split("&");
        Map<String, String> httpBody = new HashMap<String, String>();

        for (String elem : splitStr) {
            String[] secondSplit = elem.split("=");
            httpBody.put(secondSplit[0], secondSplit[1]);
        }
        return httpBody;
    }
}
