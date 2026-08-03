# Project Board

### Test Cases

TC_001_Verify Project Board page loads successfully.

Expected:
- Project name is displayed.
- Board view is selected.
- All 3 todo , inprogress and complete column is displayed.

TC_002_Verify Project Board toolbar is displayed.

Expected:
- sort button is displayed.
- filter button is displayed.
- assignee button is displayed.
- taskfilter button is displayed.
- searchbutton is displayed.
- customizebutton is displayed.
- add task button is displayed.

TC_003_Verify "Create Task" button is displayed

Expected:

Create Task button is visible.
Button is enabled.

TC_004 - Verify Create Task dialog opens successfully

Precondition

- User is logged in.
- Project Board page is open.

Steps

- Navigate to the Project Board.
- Open the Board view.
- Click Create Task.

Expected Result

- Create Task dialog/page opens.
- Task Name field is visible.
- Save/Create button is visible.


TC_005_Verify user can enter task name

Precondition

- User is logged in.
- Project Board page is open.
- opened task dialog

Steps

- Navigate to the Project Board.
- Open the Board view.
- Click Create Task.

Expected Result

- Input field should accepct vaule and display.

TC_006_Verify user can enter a task description.

Precondition

- User is logged in.
- Project Board page is open.
- opened task dialog

Steps

- Navigate to the Project Board.
- Open the Board view.
- Click Create Task.

Expected Result

- description field should accepct vaule and display.

TC_007_Verify user can enter select Priority

Precondition

- User is logged in.
- Project Board page is open.
- opened task dialog

Steps

- Navigate to the Project Board.
- Open the Board view.
- Click Create Task.
- Click on priority dropdown.
- Select normal priority.

Expected Result

- Priority dropdown is opened.
- prioriity selected.
- Priority dropdown is displayed selected one.

TC_008_Verify user can select Due Date

Precondition

- User is logged in.
- Project Board page is open.
- opened task dialog

Steps

- Navigate to the Project Board.
- Open the Board view.
- Click Create Task.
- Click on due date picker.
- Select "Tomorrow" as due date.

Expected Result

- Due date picker is opened.
- Due date selected.
- Due date field displays "Tomorrow".

TC_009_Verify user can select Assignee

Precondition

- User is logged in.
- Project Board page is open.
- opened task dialog

Steps

- Navigate to the Project Board.
- Open the Board view.
- Click Create Task.
- Click on assignee selector.
- Select an assignee from the list.

Expected Result

- Assignee selector is opened.
- Assignee selected.
- Assignee field displays selected user's initial "R".

TC_010_Verify user can create a task and appears on Board

Precondition

- User is logged in.
- Project Board page is open.
- opened task dialog

Steps

- Navigate to the Project Board.
- Open the Board view.
- Click Create Task.
- Enter task name.
- Enter task description.
- Select priority.
- Select due date.
- Select assignee.
- Click Create Task button.

Expected Result

- Task name is entered correctly.
- Task description is entered correctly.
- Priority, due date, and assignee are selected correctly.
- Task is created successfully.
- Created task appears on the Board view.

TC_011_Verify Task Details page opens

Precondition

- User is logged in.
- Project Board page is open.
- A task has already been created (TC_010).

Steps

- Navigate to the Project Board.
- Open the Board view.
- Open the created task from the Board view.
- Verify the task title.
- Verify the task status.
- Verify the task priority.
- Verify the task due date.
- Verify the task description.
- Verify the activity/history section.

Expected Result

- Task Details page opens successfully.
- Task title matches the expected task name.
- Task status is displayed correctly.
- Task priority is displayed correctly.
- Task due date is displayed correctly.
- Task description matches the expected content.
- Activity/history section is visible on the page.
