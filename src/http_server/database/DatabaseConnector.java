package orbital.http_server.database;

import orbital.http_server.database.user_management.LoginConnector;

import java.sql.*;

public abstract class DatabaseConnector {

  protected Connection connection;
  protected String loginTable = "users";
  private String url = "jdbc:mysql://localhost:3306/";

  public DatabaseConnector() {
    try {
      Class.forName("com.mysql.cj.jdbc.Driver");  
    } catch (ClassNotFoundException e) {
      System.out.println(e.getMessage());
    }
  }

  protected void finalize() throws SQLException {
    if (this.connection != null) {
      this.connection.close();
    }
  }

  public boolean connectToDB(String db, String table, String username, String password) {
    this.loginTable = table;
    try {
      this.connection = DriverManager.getConnection(url + db, username, password);
      return true;
    } catch (SQLException e) {
      System.out.println(e.getMessage());
      return false;
    }
  }
  
  public static void main(String[] args) {
    DatabaseConnector connector = new LoginConnector();
    connector.connectToDB("test", "users", "test","12345678");
//    connector.createUser("test", "1234");
//    System.out.println(connector.verifyPass("test", "1234"));
  }
}