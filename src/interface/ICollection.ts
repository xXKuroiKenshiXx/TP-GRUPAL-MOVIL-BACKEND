export interface ICollection {
  /**
   * Para controller usar el decorador '@Post(@Body() collection:any)'
   */
  create(collection: any, request: Request): void;
  /**
   * Para controller usar el decorador "@Get()" para obtener todos
   */
  // getAll(request: Request): any;
  /**
   * Para controller usar el decorador "@Get(':id')" y en params
   * '@Param('id') id: number | string'
   */
  getById(id: number | string, request: Request): any;
  /**
   * Para controller usar el decorador @Put(':id') para modificar / actualizar
   */
  updateById(id: number | string, collection: any, request: Request): any;
  /**
   * Para controller usar el decorador @Delete(':id') para dar de baja
   * o @Delete(':id') para eliminarlo completamente
   */
  // deleteById(id: number | string, request: Request): any;
}
