export const CreateUser = () => {
  return (
    <div className="create-user">
      <h1>Create User</h1>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};
