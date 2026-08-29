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

TC_013_Verify Task Details page opens.

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

TC_014_Verify user can edit task title.

Precondition

- User is logged in.
- Project Board page is open.
- Task Details page is open for the task created in the setup test.

Steps

- Edit the task title to "TC_010_Playwright Demo Task Edited".

Expected Result

- Task title is updated successfully.
- Updated task title is displayed on the Task Details page.

TC_015_Verify user can edit task description.

Precondition

- User is logged in.
- Project Board page is open.
- Task Details page is open for the task created in the setup test.

Steps

- Edit the task description to "This is a demo task description for TC_010 edited".

Expected Result

- Task description is updated successfully.
- Updated task description is displayed on the Task Details page.

TC_016_Verify user can edit task priority.

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

TC_017_Verify user can edit task due date.

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

TC_018_Verify user can edit task assignee.

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

TC_019_Verify user can edit task status.

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

TC_020_Verify user can close Task Details.

Precondition

- User is logged in.
- Project Board page is open.
- Task Details page is open for the task created in the setup test.

Steps

- Click the Task Details close button.

Expected Result

- Task Details page is closed.
- Task title is no longer visible.

TC_021_Verify user can delete edited task.

Precondition

- User is logged in.
- Project Board page is open.
- The task has been created and edited by TC_011 through TC_018.

Steps

- Navigate to the Project Board.
- Hover over the edited task.
- Open the More actions menu.
- Click Delete.

Expected Result

- The edited task is deleted successfully.
- The task no longer appears on the Board.
