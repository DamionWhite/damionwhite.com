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

  }

  // Keyboard Events here
  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === 'Enter') {
      this.saveChanges();
    }
  }

  addNewChange() {
    const type = ChangeType[
      this.changesHtml.last.nativeElement.children[0].value
    ] as ChangeType;
    const message =
      ( this.changesHtml.last.nativeElement.children[1] as HTMLInputElement )
      .value;

    // Get & Set Version
    const version = new Version();

    const versionArr = this.versionName.split('.');

    version.setMajor(versionArr[0]);
    version.setMinor(versionArr[1]);
    version.setPatch(versionArr[2]);

    version.setVersion();

    if (this.version !== version) {
      this.version = version;
    }

    // Add to changes[]
    this.changes.push({
      type,
      message,
      version
    });

    // Clear newChange description
    this.changesHtml.last.nativeElement.children[1].value = '';

  }

  getChanges() {
    console.log(this.changes);
  }

  saveChanges() {
    // Check if version is semantic (x.y.z)
    if (/([0-9]{1,}[.][0-9]{1,}[.][0-9]{1,})/.test(this.version.getVersion())) {
      for (const change of this.changes) {
        this.changelogService.addChange(change);
      }

      this.message = `Changes added for version ${this.version.getVersion()}`;
    } else {
      this.message = `Please use semantic versioning: Major.Minor.Patch`;
    }
  }
}
