# Project Board

## Feature
Verify Project Board page loads correctly.

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
