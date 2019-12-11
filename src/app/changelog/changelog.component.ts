import { Component, OnInit } from '@angular/core';
import { ChangelogService, ChangeType, Change } from '../services/changelog.service';
import { Version } from '../version';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss']
})
export class ChangeLogComponent implements OnInit {
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
      type: ChangeType.Change, message: 'Using \'Changelog\' over \'Releaselog\'', version: new Version(0, 1, 1)
    });

    this.changelogService.addChange({
      type: ChangeType.Removed, message: 'Removed releaselog', version: new Version(0, 1, 0)
    });

    this.changelog = this.changelogService.getVersionChangelog('0.1.1');

    console.log(this.versions = this.changelogService.getVersions());

    console.log(this.changelogService.getVersionChangelog('0.1.0'));
    // End Testing

    console.log(this.selectedVersion = this.changelogService.getVersions()[0]);
  }

  public onVersionSelect(event: Event) {
    // Set Version
    this.selectedVersion = (event.target as HTMLSelectElement).value;

    // Get Changes for version
    this.getSelectedVersionChanges();
  }

  private getSelectedVersionChanges(): void {
    this.changelog = this.changelogService.getVersionChangelog(this.selectedVersion);
    console.log(this.changelog);
  }
}
