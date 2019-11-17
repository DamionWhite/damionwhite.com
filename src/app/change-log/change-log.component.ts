import { Component, OnInit } from '@angular/core';
import { ChangelogService, ChangeType, Change } from '../services/changelog.service';
import { Version } from '../version';

@Component({
  selector: 'app-change-log',
  templateUrl: './change-log.component.html',
  styleUrls: ['./change-log.component.scss']
})
export class ChangeLogComponent implements OnInit {
  public changelog: Change[] = [];

  constructor( private changelogService: ChangelogService ) { }

  ngOnInit() {
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

    console.log(this.changelogService.getVersions());

    console.log(this.changelogService.getVersionChangelog('0.1.0'));
  }

}
