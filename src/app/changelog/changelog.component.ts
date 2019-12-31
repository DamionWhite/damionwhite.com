import { Component, OnInit } from '@angular/core';
import { ChangelogService, ChangeType, Change } from '../services/changelog.service';
import { Version } from '../version';
import { NgModel } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss']
})
export class ChangeLogComponent implements OnInit {
  public ChangeType = ChangeType;   // Make enum accessable to template

  public changelog: Change[] = [];

  public versions: string[] = [];
  public selectedVersion: string;

  constructor( private changelogService: ChangelogService ) { }

  ngOnInit() {
    // Testing
    this.changelogService.addChange({
      type: ChangeType.Added, message: 'Added changelogs', version: new Version(0, 1, 0)
    });

    this.changelogService.addChange({
      type: ChangeType.Change, message: 'Using \'Changelog\' over \'Releaselog\'', version: new Version(0, 1, 0)
    });

    this.changelogService.addChange({
      type: ChangeType.Removed, message: 'Removed releaselog', version: new Version(0, 1, 0)
    });

    this.changelogService.addChange({
      type: ChangeType.Added, message: 'Added more changes', version: new Version(0, 1, 0)
    });

    this.changelog = this.changelogService.getVersionChangelog('0.1.0');

    console.log(this.versions = this.changelogService.getVersions());

    console.log(this.changelogService.getVersionChangelog('0.1.0'));
    // End Testing

    console.log(this.selectedVersion = this.changelogService.getVersions()[0]);


  }

  // Triggers when a new version is selected
  public onVersionSelect(event: Event) {
    // Set Version
    this.selectedVersion = (event.target as HTMLSelectElement).value;

    // Get Changes for version
    this.getSelectedVersionChanges();
  }

  // Checks if changeType is present in the currently selected version
  // Returns true if changeType is present, else returns false
  public isChangeTypePresent(changeType: ChangeType): boolean {
    return Boolean(this.changelog.find(change => change.getType() === changeType ));
  }

  // Returns an array of changes based on changetype
  public getChangesByType(changeType: ChangeType): Change[] {
    return this.changelog.filter(change => change.getType() === changeType);
  }

  private getSelectedVersionChanges(): void {
    this.changelog = this.changelogService.getVersionChangelog(this.selectedVersion);
    console.log(this.changelog);
  }
}
