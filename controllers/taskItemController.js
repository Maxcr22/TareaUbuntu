const pool = require("../db");
const asyncHandler = require("express-async-handler");

//@desc Get all task_items
//@route GET/taskItems
//@access Private
const getAllTaskItems = asyncHandler(async (req, res) => {
  try {
    const taskItems = await pool.query("SELECT * FROM task_item");
    res.json(taskItems.rows);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error getting task items",
      works: false,
    });
  }
});

//@desc Get one task_items
//@route GET/taskItems/:id
//@access Private
const getOneTaskItem = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const taskItems = await pool.query(
      "SELECT * FROM task_item WHERE id = $1",
      [id]
    );
    res.json(taskItems.rows);
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Item not found",
      works: false,
    });
  }
});

//@desc Get all task_items from a particular task id in an specific status
//@route GET/taskItems/task/:task/status/:status
//@access Private
const getAllTaskItemsForTask = asyncHandler(async (req, res) => {
  try {
    const { taskId, status } = req.params;

    const taskItems = await pool.query(
      "SELECT * FROM task_item WHERE task_Id = $1 and status = $2;",
      [taskId, status]
    );

    if (taskItems.rows.length === 0) {
      return res.status(400).json({
        message: "Task items not found for requested task and status.",
      });
    }

    res.status(200).json(taskItems.rows);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error obtaining task items.",
      works: false,
    });
  }
});

//@desc Create new task_item
//@route POST/taskItems
//@access Private
const createNewTaskItem = asyncHandler(async (req, res) => {
  try {
    const {
      machine_name,
      pdf_file_path,
      pdf_name,
      status,
      knUser_id,
      task_id,
      data,
      performerData,
    } = req.body;


    const taskItem = await pool.query(
      "SELECT * FROM task_item WHERE pdf_name = $1",
      [pdf_name]
    );
    if (taskItem.rows.length > 0) {
      return res.status(303).json({
        message: "Task Item already exists",
        works: false,
      });
    }

    const result = await pool.query(
      'INSERT INTO task_item (machine_name, pdf_file_path, pdf_name, status, "knUser_id", task_id, "data", "performerData") VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
      [machine_name, pdf_file_path, pdf_name, status, knUser_id, task_id, data, performerData]
    );
    res.status(200).json({ message: "Ok" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error creating task item",
      works: false,
    });
  }
});

//@desc Update a Task_item
//@route PUT/taskItems
//@access Private
const updateTaskItem = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const {
      machine_name,
      pdf_file_path,
      pdf_name,
      status,
      knUser_id,
      task_id,
      data,
      performerData
    } = req.body;
    const result = await pool.query(
      `UPDATE task_item SET machine_name = $1, pdf_file_path = $2, pdf_name = $3, status = $4, "knUser_id" = $5, task_id = $6, "data" = $7, "performerData" = $8, update_date = timezone('utc', now()) WHERE id = $9`,
      [
        machine_name,
        pdf_file_path,
        pdf_name,
        status,
        knUser_id,
        task_id,
        data,
        performerData,
        id,
      ]
    );
    if (result.rowCount === 0)
      return res.status(400).json({
        message: "Task_item not found",
      });

    res.status(200).json({ message: "Ok" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error updating task",
      works: false,
    });
  }
});

//@desc Update task items status by id
//@route PUT/taskItems/:status
// Id must be sent in the body as {"id" : ["id1", "id2", "id3"]} to it can be read by the database
//@access Private
const updateTaskItemStatusById = asyncHandler(async (req, res) => {
  try {
    // Could be one or multiple ids
    const { status } = req.params;
    //ARRAY
    const { id } = req.body;

    const result = await pool.query(
      `UPDATE task_item SET status = $1 WHERE id = ANY ($2) and status <> $3;`,
      [status, id, status]
    );

    if (result.rowCount === 0)
      return res.status(400).json({
        message: "Task items not found",
      });

    res.status(200).json({ message: "Ok" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error updating tasks",
      works: false,
    });
  }
});

//@desc Delete a task item
//@route DELETE/taskItems
//@access Private
const deleteTaskItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM task_item WHERE id = $1", [
      id,
    ]);

    if (result.rowCount === 0)
      return res.status(400).json({
        message: "Task_item not found",
      });
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error deleting Task item",
      works: false,
    });
  }
});

const getPdfFile = asyncHandler(async (req, res) => {
  const { filePath, directoryToCopy } = req.body;

  //include the fs, path modules
  var fs = require('fs');

  try {
    // File destination.txt will be created or overwritten by default.
    fs.copyFile(filePath, directoryToCopy, (err) => {
      if (err) return res.status(400).json({
        message: err
      })
      else return res.status(200).json({
        message: "Successfully moved",
        fileName: filePath
      })
    });


  } catch (error) {
    console.log(error);
    return res.sendStatus(204);
  }
});

module.exports = {
  getAllTaskItems,
  getOneTaskItem,
  getAllTaskItemsForTask,
  createNewTaskItem,
  updateTaskItem,
  updateTaskItemStatusById,
  deleteTaskItem,
  getPdfFile
};
