export class CreateTodoDto {
  private constructor(public readonly text: string) {}

  static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
    const { text } = props;
    if (!text) return ["Text is required", undefined];
    if (typeof text !== "string") return ["Text must be a string", undefined];
    if (text.length < 3)
      return ["Text must be at least 3 characters", undefined];
    if (text.length > 255)
      return ["Text must be less than 255 characters", undefined];
    if (text.trim() !== text)
      return ["Text must not contain leading or trailing spaces", undefined];
    return [undefined, new CreateTodoDto(text)];
  }
}
