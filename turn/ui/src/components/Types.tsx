export type ClearanceFrm = {
  id: string;
  officeAbbrev: string;
  officeName: string;
  unit: string,
  group: string;
  name?: string;
  abbrev?: string;
  type?: string;
  unitId?: string;
};

export type Unit = {
    id: string;
    name: string;
    desc: string;
  };

  export type Office = {
    id: string;
    name: string;
    abbrev: string;
    unit: string;
    type: string;
  };

  export type clearanceGroups = {
    id: string;
    name: string;
    abbrev: string;
  }

  export type User = {
    id: string;
    username: string;
    password: string | number;
    unit: string;
    type: string;
    rights: string;
    unit_id: string | number;
    type_name: string;
    type_id: string;
  };

  export type UserType = {
    id: string;
    name: string;
    desc: string;
  }

  export type Config = {
    id?: string,
    unit_id?: string,
    main: string,
    identifier: string,
    f_fname: string,
    f_lname: string,
    f_mname: string,
    f_suffix: string,
    f_group: string,
    f_level: string,
    c_joins: TJoin[]
  }

  export type TJoin = {
    id?: string,
    tbl: string,
    onLeft: string,
    onRight: string
  }

  export type StudentClearanceStatus = {
    id: string,
    name: string,
    remarks: string,
    stud_id: string,
    year: string,
    description: string
  }
