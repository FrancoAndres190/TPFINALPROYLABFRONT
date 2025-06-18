export const CreateClasses = () => {
  return (
    <div className="create-classes">
      <h1>Create Classes</h1>
      <form>
        <div>
          <label htmlFor="className">Class Name:</label>
          <input type="text" id="className" name="className" required />
        </div>
        <div>
          <label htmlFor="classTime">Class Time:</label>
          <input type="time" id="classTime" name="classTime" required />
        </div>
        <button type="submit">Create Class</button>
      </form>
    </div>
  );
};
