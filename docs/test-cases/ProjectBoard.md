# Project Board

### Test Cases

TC_001_Verify user can open ClickUp successfully.

Precondition

- User has valid login credentials.

Steps

- Open ClickUp.

Expected Result

- ClickUp opens successfully.
- User's workspace is displayed.

TC_002_Verify user can open the workspace menu.

Precondition

- User is logged in.
- ClickUp is open.

Steps

- Open the workspace settings/menu.
- Open the People option.

Expected Result

- Workspace settings page opens.
- People/Users page opens successfully.
- The URL contains "/users".

TC_003_Verify Project Board page loads successfully.

Precondition

- User is logged in.

Steps

- Navigate to the Project Board.
- Open the Board view.

Expected Result

- Project name is displayed.
- To Do, In Progress, and Complete columns are displayed.

TC_004_Verify Project Board toolbar is displayed.

Precondition

- User is logged in.
- Project Board page is open.

Expected Result

- Sort button is displayed.
- Filter button is displayed.
- Assignee button is displayed.
- Task Filter button is displayed.
- Search button is displayed.
- Customize button is displayed.

TC_005_Verify "Create Task" button is displayed.

Precondition

- User is logged in.
- Project Board page is open.

Expected Result

- Create Task button is visible.
- Create Task button is enabled.

TC_006_Verify clicking "Create Task" button opens Add Task dialog.

Precondition

- User is logged in.
- Project Board page is open.

Steps

- Click Create Task.

Expected Result

- Add Task dialog opens.
- Task Name field is visible.
- Description field is visible.
- Assignee control is visible.
- Due Date control is visible.
- Priority control is visible.
- Tags control is visible.
- Create Task button is visible.
- Close button is visible.

TC_007_Verify user can enter task name.

Precondition

- User is logged in.
- Project Board page is open.
- Add Task dialog is open.

Steps

- Enter "TC_010_Playwright Demo Task" in the task name field.

Expected Result

- Task name field displays "TC_010_Playwright Demo Task".

TC_008_Verify user can enter a task description.

Precondition

- User is logged in.
- Project Board page is open.
- Add Task dialog is open.

Steps

- Enter "This is a demo task description for TC_010" in the description field.

Expected Result

- Description field displays "This is a demo task description for TC_010".

TC_009_Verify user can select Normal priority.

Precondition

- User is logged in.
- Project Board page is open.
- Add Task dialog is open.

Steps

- Open the priority dropdown.
- Select Normal priority.

Expected Result

- Priority control displays "Normal".

TC_010_Verify user can select Due Date.

Precondition

- User is logged in.
- Project Board page is open.
- Add Task dialog is open.

Steps

- Open the due date picker.
- Select "Tomorrow" as the due date.

Expected Result

- Due date control displays "Tomorrow".

TC_011_Verify user can select Assignee.

Precondition

- User is logged in.
- Project Board page is open.
- Add Task dialog is open.

Steps

- Open the assignee selector.
- Select the available assignee.

Expected Result

- Assignee control displays the selected user's initial "R".

TC_012_Verify user can create a task, verify it appears on Board, and delete it.

Precondition

- User is logged in.
- Project Board page is open.

Steps

- Click Create Task.
- Enter task name "TC_010_Playwright Demo Task".
- Enter task description "This is a demo task description for TC_010".
- Select Normal priority.
- Select "Tomorrow" as the due date.
- Select the assignee displaying initial "R".
- Click Create Task button.
- Verify the task appears on the Board.
- Hover over the created task.
- Open the More actions menu.
- Click Delete.

Expected Result

- Task is created successfully.
- Created task appears on the Board view.
- Deleted task no longer appears on the Board view.

TC_013_Verify task can move from To Do to In Progress and Complete.

Precondition

- User is logged in.
- Project Board page is open.

Steps

- Create a task named with the status-workflow data set.
- Confirm it appears in the To Do column.
- Drag the task to the In Progress column.
- Confirm it appears in the In Progress column.
- Mark the task as complete.
- Confirm it appears in the Complete column.
- Delete the completed task.

Expected Result

- The task moves successfully across the board columns.
- The task is visible in each expected status bucket at the correct stage.
- The task is removed from the board after cleanup.

TC_014_Verify Task Details page opens.

Precondition

- User is logged in.
- Project Board page is open.
- A task has been created using the task details test setup.

Steps

- Open the created task from the Board view.
- Verify the task title.
- Verify the task status.
- Verify the task assignee.
- Verify the task priority.
- Verify the task due date.
- Verify the task description.
- Verify the activity/history section.

Expected Result

- Task Details page opens successfully.
- Task title is "TC_010_Playwright Demo Task".
- Task status is displayed as "to do".
- Task assignee is displayed as "R".
- Task priority is displayed as "Normal".
- Task due date is displayed as "Tomorrow".
- Task description is displayed as "This is a demo task description for TC_010".
- Activity/history section is visible.

TC_015_Verify user can edit task title.

Precondition

- User is logged in.
- Project Board page is open.
- Task Details page is open for the task created in the setup test.

Steps

- Edit the task title to "TC_010_Playwright Demo Task Edited".

Expected Result

- Task title is updated successfully.
- Updated task title is displayed on the Task Details page.

TC_016_Verify user can edit task description.

Precondition

- User is logged in.
- Project Board page is open.
- Task Details page is open for the task created in the setup test.

Steps

- Edit the task description to "This is a demo task description for TC_010 edited".

Expected Result

- Task description is updated successfully.
- Updated task description is displayed on the Task Details page.

TC_017_Verify user can edit task priority.

Precondition

- User is logged in.
- Project Board page is open.
- Task Details page is open for the task created in the setup test.

Steps

- Open the priority dropdown.
- Select "Low" priority.

Expected Result

- Priority is updated to "Low".
- Updated priority is displayed on the Task Details page.

TC_018_Verify user can edit task due date.

Precondition

- User is logged in.
- Project Board page is open.
- Task Details page is open for the task created in the setup test.

Steps

- Open the due date picker.
- Select "Today" as the due date.

Expected Result

- Due date is updated to "Today".
- Updated due date is displayed on the Task Details page.

TC_019_Verify user can edit task assignee.

Precondition

- User is logged in.
- Project Board page is open.
- Task Details page is open for the task created in the setup test.

Steps

- Hover over the current assignee.
- Remove the current assignee.
- Open the assignee dropdown.
- Select "Me" as the new assignee.

Expected Result

- Current assignee is removed successfully.
- New assignee is selected successfully.
- Updated assignee is displayed as "PG" on the Task Details page.

TC_020_Verify user can edit task status.

Precondition

- User is logged in.
- Project Board page is open.
- Task Details page is open for the task created in the setup test.

Steps

- Open the task status control.
- Select "In Progress".

Expected Result

- Task status is updated successfully.
- Updated task status is displayed as "in progress" on the Task Details page.

TC_021_Verify user can close Task Details.

Precondition

- User is logged in.
- Project Board page is open.
- Task Details page is open for the task created in the setup test.

Steps

- Click the Task Details close button.

Expected Result

- Task Details page is closed.
- Task title is no longer visible.

TC_022_Verify user can delete edited task.

Precondition

- User is logged in.
- Project Board page is open.
- The task has been created and edited by TC_014 through TC_021.

Steps

- Navigate to the Project Board.
- Hover over the edited task.
- Open the More actions menu.
- Click Delete.

Expected Result

- The edited task is deleted successfully.
- The task no longer appears on the Board.

TC_023_Verify empty task name validation keeps the dialog open.

Precondition

- User is logged in.
- Project Board page is open.
- Add Task dialog is open.

Steps

- Click Create Task without entering a task name.
- Click Create Task again.

Expected Result

- The Add Task dialog remains open.
- The task name field is still visible and empty.
- The validation message "Enter Task Name" is displayed.

TC_024_Verify long task names are accepted in the Add Task dialog.

Precondition

- User is logged in.
- Project Board page is open.

Steps

- Open the Add Task dialog.
- Enter a long task name value.

Expected Result

- The task name field accepts the full value without truncation or validation failure.
- The dialog remains usable.

TC_025_Verify special characters are accepted in the task name field.

Precondition

- User is logged in.
- Project Board page is open.

Steps

- Open the Add Task dialog.
- Enter a task name containing special characters.

Expected Result

- The task name field displays the entered special characters exactly as typed.
- The dialog remains stable and does not reject the input.

TC_026_Verify cancelling a draft removes the unsaved task after confirmation.

Precondition

- User is logged in.
- Project Board page is open.

Steps

- Open the Add Task dialog.
- Enter task details without creating the task.
- Close the dialog.
- Confirm the delete draft action.

Expected Result

- The draft is removed.
- The Add Task dialog closes cleanly.
- The unsaved task is not visible on the Board.

TC_027_Verify canceling the save-draft prompt keeps the task draft available.

Precondition

- User is logged in.
- Project Board page is open.

Steps

- Open the Add Task dialog.
- Fill in the task fields.
- Close the dialog.
- Cancel the save-draft prompt instead of deleting the draft.

Expected Result

- The draft is preserved and the dialog reopens with the saved values.
- The user can continue editing the task without losing the entered data.
