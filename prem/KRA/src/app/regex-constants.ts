export class RegexConstants {
    private static mailPattern = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
        
        public static getMailPattern(): string {
            return this.mailPattern;
        }
}
