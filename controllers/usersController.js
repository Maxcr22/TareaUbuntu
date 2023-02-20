//@route POST/users
//@access Private
const createNewUser = asyncHandler(async (req, res) => {
  try {
    

    try {
      const { id, name, email } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await pool.query('SELECT * FROM users WHERE email = $1', [
        email,
      ]);
      if (user.rows.length > 0) {
        return res.status(200).json({
          message: "User already exists",
          works: false,
        });
      }
      
      const result = await pool.query(
        'INSERT INTO users (id,name,email) VALUES ($1,$2,$3) RETURNING *',
        [id, name, email]
      );
      res.status(200).json({ message: "User created!" });
    } catch (error) {
      console.log(error);
    }



  } catch (error) {
    return res.status(500).json({
      message: "Error creating user",
      works: false,
    });
  }
});

//@desc Update a User
//@route PUT/users
//@access Private

//const updateUser = asyncHandler(async (req, res) => {
  //try {
    //const allTask = await pool.query('SELECT * FROM "users"');
    //res.json(allTask.rows);
  //} catch (error) {}
//});


const updateUser = asyncHandler(async (req, res) => {
  try {
    const  {id}  = req.params;
    const {name,email} = req.body;

    const result = await pool.query(`UPDATE users SET name = $2, email = $3 WHERE id = $1`,
      [id,name,email]
    );

    if (result.rowCount === 0)
      return res.status(400).json({
        message: "User not found",
      });

    res.status(200).json({ message: "Updated" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error updating User",
      
      works: false,
      
    });
    
  }
});


   


//@desc Delete a user
//@route DELETE/users
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    

    if (result.rowCount === 0)
      return res.status(400).json({
        message: "User not found",
      });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting user",
      works: false,
    });
  }
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
