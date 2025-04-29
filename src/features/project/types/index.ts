export interface Project {
  id: string;
  name: string;
  users: string[];
}

export interface ProjectDetails {
  id: string;
  name: string;
  users: string[];
  sprints: Sprint[];
}

export interface Task {
  sprintNumber: number;
  name: string;
  priority: Priority;
  status: Status;
  assignedTo: string[];
  tags: Tag[];
}

export interface MainTask extends Task {
  subTasks: SubTask[];
}

export interface SubTask extends Task {
  pararentTaskId: string;
  subSubTasks: SubSubTask[];
}

export interface SubSubTask extends Task {
  parentSubTaskId: string;
}

export interface Sprint {
  id: string;
  name: string;
  status: SprintStatus;
  startDate: Date;
  endDate: Date;
  tasks: Task[];
}

export type Priority = "High" | "Medium" | "Low";
export type SprintStatus = "Future" | "Current" | "Completed" | "Next";
export type Status = "To Do" | "In Progress" | "Done";
export type Tag =
  | "Front-End"
  | "Back-End"
  | "Full-Stack"
  | "UI/UX"
  | "Improvement"
  | "Bug";
