export type ClearanceFrm = {
  id: string;
  officeAbbrev: string;
  officeName: string;
  unit: string,
  group: string;
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

  export type User = {
    id: string;
    username: string;
    password: string | number;
    unit: string;
    type: string;
    rights: string;
  };

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

