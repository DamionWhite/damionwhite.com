export class Version {
  private version: string;
  private major: number;
  private minor: number;
  private patch: number;

  constructor(major?: number, minor?: number, patch?: number) {
    this.major = major || 0;
    this.minor = minor || 0;
    this.patch = patch || 0;
    this.setVersion();
  }

  public getVersion(): string {
    return this.version;
  }

  public setVersion(): void {
    this.version = `${this.major}.${this.minor}.${this.patch}`;
  }

  public getMajor(): number {
    return this.major;
  }

  public setMajor(major: number): void {
    this.major = major;
    this.setVersion();
  }

  public getMinor(): number {
    return this.minor;
  }

  public setMinor(minor: number): void {
    this.minor = minor;
    this.setVersion();
  }

  public getPatch(): number {
    return this.patch;
  }

  public setPatch(patch: number): void {
    this.patch = patch;
    this.setVersion();
  }
}
