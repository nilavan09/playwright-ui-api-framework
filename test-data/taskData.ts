export const taskData = {
    taskName: "TC_010_Playwright Demo Task",
    taskDescription: "This is a demo task description for TC_010",
    taskDescriptionEdited: "This is a demo task description for TC_010 edited",
    taskNameEdit:"TC_010_Playwright Demo Task Edited",
    longTaskName: `Long task ${'A'.repeat(180)}`,
    specialTaskName: `Special task @#$% [] {} ${Date.now()}`,
    cancelledTaskName: "Cancelled task",
    statusTaskName: `Status workflow task ${Date.now()}`,
    assignee: [
        "R",
        "PG"
    ],
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
    statusOptions:[
        'to do',
        'in progress',
        'complete'
    ],
    priorityOptions:[
        "Normal",
         "Low",
         "Urgent",
         "High"
    ],


};