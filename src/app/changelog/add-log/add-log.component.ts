import { Component, ViewChildren, AfterViewInit, QueryList, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ChangelogService, IChange, ChangeType } from 'src/app/services/changelog.service';
import { Version } from 'src/app/version';

@Component({
  selector: 'app-add-log',
  templateUrl: './add-log.component.html',
  styleUrls: ['./add-log.component.scss']
})
export class AddLogComponent implements AfterViewInit {
  @ViewChild('date', {read: ElementRef, static: true}) dateHtml: ElementRef;
  @ViewChildren('change') changesHtml: QueryList<any>;
  public ChangeType = ChangeType;   // Make enum accessable to template

  public changes: IChange[] = [];
  public version: Version;
  public versionName;
  public versionDate;
  public message = '';

  constructor(private changelogService: ChangelogService) { }

  ngAfterViewInit() {
    // Setup empty change
    this.changes.push({type: ChangeType.Added, message: "", version: undefined});

  }

  // Keyboard Events here
  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === 'Enter') {
      this.saveChanges();
    }
  }

  // If change is last, add new empty change to changes
  onInput(index) {
    // Is element changed the last in array?
    if (this.changes.length === index+1) {
      // Add new empty change
      this.changes.push({type: ChangeType.Added, message: "", version: undefined});
    }
  }

  getChanges() {
    console.log(this.changes);
  }

  saveChanges() {
     // Get & Set Version
     const version = new Version();
     const versionArr = this.versionName.split('.');
 
     version.setMajor(versionArr[0]);
     version.setMinor(versionArr[1]);
     version.setPatch(versionArr[2]);
 
     version.setVersion();

    // Check if version is semantic (x.y.z)
    if (/([0-9]{1,}[.][0-9]{1,}[.][0-9]{1,})/.test(version.getVersion())) {
      for (const change of this.changes) {
        if (change.message !== "") {
          change.version = version;
          this.changelogService.addChange(change);
        }
      }

      this.message = `Changes added for version ${version.getVersion()}`;
    } else {
      this.message = `Please use semantic versioning: Major.Minor.Patch`;
    }
  }
}
