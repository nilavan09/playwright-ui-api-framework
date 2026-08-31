/**
 * Task Test Data Module
 * 
 * Centralized test data for task-related test scenarios.
 * Includes task names, descriptions, status options, priorities, and assignees.
 * Data is used across all task creation, editing, and validation tests.
 * 
 * Usage: Import taskData and reference specific properties for test scenarios.
 */

export const taskData = {
    // Default task name used in task creation tests.
    taskName: "TC_010_Playwright Demo Task",
    // Default task description used in task creation tests.
    taskDescription: "This is a demo task description for TC_010",
    // Updated task description used in task editing tests.
    taskDescriptionEdited: "This is a demo task description for TC_010 edited",
    // Updated task name used in task editing tests.
    taskNameEdit:"TC_010_Playwright Demo Task Edited",
    // Long task name used to test character limit validation.
    longTaskName: `Long task ${'A'.repeat(180)}`,
    // Task name with special characters used to test special character acceptance.
    specialTaskName: `Special task @#$% [] {} ${Date.now()}`,
    // Task name used for draft cancellation tests.
    cancelledTaskName: "Cancelled task",
    // Task name with timestamp used for status workflow tests.
    statusTaskName: `Status workflow task ${Date.now()}`,
    // List of assignee names for assignment tests.
    assignee: [
        "R",
        "PG"
    ],
    // Available due date options for due date selection tests.
    dueDateOptions: [
    {
        value: "today",
        label: "Today"
    },
    {
        value: "tomorrow",
        label: "Tomorrow"
    }
    ],
    // Available status options for task status workflow tests.
    statusOptions:[
        'to do',
        'in progress',
        'complete'
    ],
    // Available priority options for task priority selection tests.
    priorityOptions:[
        "Normal",
         "Low",
         "Urgent",
         "High"
    ],


};