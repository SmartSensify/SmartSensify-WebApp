interface Group {
  _id: string;
  name: string;
  description: string;
  users: string[];
  sensors?: string[];
}

export default Group;
