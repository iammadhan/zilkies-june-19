export class Constants {
  private static emailPattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
  private static passwordPattern = '^(?=.*[0-9])[a-zA-Z0-9!]{8,16}$';
  public static getEmailPattern(): string {
      return this.emailPattern;
  }
  public static getPasswordPattern(): string {
      return this.passwordPattern;
  }
}
