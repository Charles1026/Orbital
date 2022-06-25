package orbital.http_server.database.user_management;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class ParticularsConnector extends UserConnector {

    public boolean getInfo() {
        String query = "SELECT * FROM " + super.loginTable + " WHERE uname = "; //TODO: need to add the identifier for WHERE

        try {
            Statement statement = super.connection.createStatement();
            ResultSet results = statement.executeQuery(query);
            return true;
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            return false;
        }
    }
}
