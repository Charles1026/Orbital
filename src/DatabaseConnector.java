package orbital;

import java.sql.*;

public class DatabaseConnector {
  
  private Connection connection;

  private String loginTable = "users";

  private String url = "jdbc:mysql://localhost:3306/";

  public DatabaseConnector() {
    try {
      Class.forName("com.mysql.cj.jdbc.Driver");  
    } catch (ClassNotFoundException e) {
      System.out.println(e.getMessage());
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

  private boolean userRegistered(String user) {
    String query = "SELECT uname FROM " + this.loginTable + " login WHERE uname = ?;";
    try {
      PreparedStatement statement = connection.prepareStatement(query);
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

  public boolean verifyPass(String user, String pass) {
    if (!userRegistered(user)) {
      System.out.println("User Does not Exist.");
      return false;
    }
    String query = "SELECT pword FROM " + this.loginTable + " WHERE uname=?";
    try {
      PreparedStatement statement = connection.prepareStatement(query);
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

  public boolean createUser(String user, String pass) {
    if (userRegistered(user)) {
      System.out.println("User Already Registered.");
      return false;
    }
    String query = "INSERT INTO " + this.loginTable + "(uname, pword) VALUES (?,?)";
    try {
      PreparedStatement statement = connection.prepareStatement(query);
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

  
  public static void main(String[] args) {
    DatabaseConnector connector = new DatabaseConnector();
    connector.connectToDB("test", "users", "test","12345678");
    connector.createUser("test", "1234");
    System.out.println(connector.verifyPass("test", "1234"));
  }
}