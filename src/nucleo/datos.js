// NUCLEO · la base compartida. No importa a nadie (regla R3).
export const LIBROS = [
  { id: 'l1', nombre: 'Cien años de soledad', autor: 'Gabriel García Márquez', sede: 'Sede Chapinero', genero: 'Novela',   deposito: 8000 },
  { id: 'l2', nombre: 'La Vorágine',           autor: 'José Eustasio Rivera',  sede: 'Sede Tunal',      genero: 'Novela',   deposito: 6000 },
  { id: 'l3', nombre: 'Clean Architecture',    autor: 'Robert C. Martin',      sede: 'Sede Chapinero',  genero: 'Tecnología', deposito: 15000 },
  { id: 'l4', nombre: 'Rayuela',               autor: 'Julio Cortázar',        sede: 'Sede Suba',       genero: 'Novela',   deposito: 7000 }
];

export const EJEMPLARES = ['Ej. 1', 'Ej. 2', 'Ej. 3', 'Ej. 4'];

// Ejemplares ya prestados, con formato "idLibro|ejemplar"
export const PRESTADOS = new Set(['l1|Ej. 2', 'l2|Ej. 1', 'l4|Ej. 1']);
