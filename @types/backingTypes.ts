export interface Todo {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    userID: string;
    createdAt: Date;
    updatedAt: Date;
}
