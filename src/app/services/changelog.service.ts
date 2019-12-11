import { Injectable } from '@angular/core';
import { Version } from '../version';

export interface IChange {
  type: ChangeType;
  message: string;
  version: Version;
}

export enum ChangeType {
  Added = 'Added',
  Change = 'Change',
  Deprecated = 'Deprecated',
  Removed = 'Removed',
  Bugfix = 'Bugfix',
  Security = 'Security'
}


export class Change {

  private type: ChangeType;
  private message: string;
  private version: Version;

  constructor(obj?: IChange) {
    this.type = obj && obj.type || null;
    this.message = obj && obj.message || null;
    this.version = obj && obj.version || null;
  }

  public getType(): ChangeType {
    return this.type;
  }

  public setType(t: ChangeType): any {
    this.type = t;
  }

  public getMessage(): string {
    return this.message;
  }

  public setMessage(m: string) {
    this.message = m;
  }

  public getVersion(): Version {
    // Returns a Version object
    return this.version;
  }

  public getVersionString(): string {
    // Returns a version string
    return this.version.getVersion();
  }

}

@Injectable({
  providedIn: 'root'
})
export class ChangelogService {
  private changes: Change[];
  private versions: string[];

  constructor() {
    this.changes = [];
    this.versions = [];
  }

  public getChanges(): Change[] {
    return this.changes;
  }

  public addChange(obj: IChange): void {
    const change = new Change(obj);
    this.changes.push(change);
    this.addVersion(change.getVersion());
  }

  public getVersions(): string[] {
    // retrieve all versions
    return this.versions;
  }

  public setVersions(): void {
    // Go through all changes to retrieve know versions
    for (const change of this.changes) {
      if (!this.versions.includes(change.getVersionString())) {
        this.versions.push(change.getVersionString());
      }
    }
  }

  public getVersion(v: string): any {
    // returns version if exists
    // returns null if does not exist
    if (this.versions.includes(v)) {
      return this.versions.includes(v);
    } else {
      return null;
    }
  }

  public addVersion(v: Version): void {
    // Add a new version

    const version = v.getVersion();
    // Only add if version does not already exist
    if (!this.versions.includes(version)) {
      this.versions.push(version);
    }
  }

  public getVersionChangelog(v: string): any {
    // returns array containing all changes of a version
    const versionChanges: Change[] = [];

    // Check if version exist
    if (this.getVersion(v)) {
      // Add every change of version
      for (const change of this.changes) {
        if (change.getVersionString() === v) {
          versionChanges.push(change);
        }
      }
    }

    return versionChanges;
  }
}
