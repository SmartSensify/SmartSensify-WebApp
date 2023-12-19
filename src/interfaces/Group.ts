interface Group {
    _id: string;
    name: string;
    description: string;
    users: string[]; // Assuming user IDs are strings
    sensors?: string[]; // Assuming sensor IDs are strings
  }
  
  export default Group;
  