package orbital.http_server.database.user_management;

import orbital.http_server.database.DatabaseConnector;

import java.sql.PreparedStatement;
import java.sql.SQLException;

public class RegisterConnector extends UserConnector {

    public boolean createUser(String user, String pass) {
        if (userRegistered(user)) {
            System.out.println("User Already Registered.");
            return false;
        }
        String query = "INSERT INTO " + super.loginTable + "(uname, pword) VALUES (?,?)";
        try {
            PreparedStatement statement = super.connection.prepareStatement(query);
            statement.setString(1, user);
            statement.setString(2, pass);

            boolean created = statement.executeUpdate() == 0;

            statement.close();
            return created;

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            return false;
        }
    }
}
