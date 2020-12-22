interface _HospitalMedico {
  _id: string;
  nombre: string;
  img: string;
}

interface _MedicoUser {
  _id: string;
  nombre: string;
  img: string;
}

export class Medico {
  constructor(
    public nombre: string,
    public usuario?: _MedicoUser,
    public hospital?: _HospitalMedico,
    public img?: string,
    public _id?: string
  ) {}
}
