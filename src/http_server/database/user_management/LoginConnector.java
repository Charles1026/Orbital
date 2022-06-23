package orbital.http_server.database.user_management;

import orbital.http_server.database.DatabaseConnector;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class LoginConnector extends UserConnector {


    public boolean verifyPass(String user, String pass) {
        if (!userRegistered(user)) {
            System.out.println("User Does not Exist.");
            return false;
        }
        String query = "SELECT pword FROM " + super.loginTable + " WHERE uname=?";
        try {
            PreparedStatement statement = super.connection.prepareStatement(query);
            statement.setString(1, user);
            ResultSet results = statement.executeQuery();

            results.next();

            boolean verified = results.getString("pword").equals(pass);

            statement.close();
            return verified;

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            return false;
        }
    }
}
