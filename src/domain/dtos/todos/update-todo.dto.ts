export class UpdateTodoDto {
  // Constructor con parametros
  private constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly completedAt: Date | null
  ) {}
  // Getter para retornar el objeto con las propiedades que se pasaron
  get value() {
    const returnObj: { [key: string]: any } = {};
    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = this.completedAt;
    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, text, completedAt } = props;
    if (!id || isNaN(id)) return ["id must be a valid number"];
    let newCompletedAt: Date | null = completedAt;
    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (newCompletedAt.toString() === "Invalid Date") {
        return ["Invalid date"];
      }
    }
    return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
  }
}
