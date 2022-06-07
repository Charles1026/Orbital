package orbital.http_server.database.user_management;

import orbital.http_server.database.DatabaseConnector;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public abstract class UserConnector extends DatabaseConnector {

    protected boolean userRegistered(String user) {
        String query = "SELECT uname FROM " + super.loginTable + " login WHERE uname = ?;";
        try {
            PreparedStatement statement = super.connection.prepareStatement(query);
            statement.setString(1, user);
            ResultSet results = statement.executeQuery();

            results.next();

            statement.close();
            return true;

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            return false;
        }
    }
}
