package orbital;

import java.sql.*;

public class DatabaseConnector {
  
  private Connection connection;

  public DatabaseConnector() {
    Class.forName("com.mysql.jdbc.Driver");
  }

  public boolean connectToSQL(String url, String username, String password) {
    this.connection = DriverManager.getConnection(url, username, password);

    return true;
  }

  
  public static void main(String[] args) {
    DatabaseConnector connector = new DatabaseConnector();

    connector.connectToSQL("jdbc:mysql://localhost:3306/test","test","12345678");
  }
}
