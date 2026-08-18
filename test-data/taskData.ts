import { getPriority } from "node:os";

export const taskData = {
    taskName: "TC_010_Playwright Demo Task",
    taskDescription: "This is a demo task description for TC_010",
    taskDescriptionEdited: "This is a demo task description for TC_010 edited",
    taskNameEdit:"TC_010_Playwright Demo Task Edited",
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